import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blog";
// #region SEED_SCRIPT — remove this import when deleting seed logic
import { blogPosts as initialBlogs } from "@/data/blogs";
// #endregion SEED_SCRIPT

// #region SEED_SCRIPT — delete localImageBySlug + resolveImage when removing seed logic
// Build a slug → local bundled image map so stale Firestore URLs never break images.
const localImageBySlug: Record<string, string> = Object.fromEntries(
  initialBlogs.map((b) => [b.slug, b.image])
);

/**
 * Resolves the correct image for a blog post:
 * - If the blog has a custom remote image (uploaded by admin), use it.
 * - Otherwise fall back to the locally-bundled static asset by slug.
 */
const resolveImage = (blog: Blog): string => {
  const isRemote = blog.image?.startsWith("http") || blog.image?.startsWith("data:");
  if (isRemote) return blog.image;
  return localImageBySlug[blog.slug] ?? blog.image;
};
// #endregion SEED_SCRIPT

const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const fetchedBlogs: Blog[] = [];

    querySnapshot.forEach((docSnap) => {
      fetchedBlogs.push({ ...(docSnap.data() as Blog), id: docSnap.id });
    });

    // #region SEED_SCRIPT — delete this block + replace `resolved` with `fetchedBlogs` below
    // Seed strategy: if there are no blogs in Firebase, push the initial ones
    if (fetchedBlogs.length === 0) {
      console.log("Seeding initial blogs to Firebase...");
      for (const blog of initialBlogs) {
        const { id, ...rest } = blog;
        const blogData = {
          ...rest, id, createdAt: Date.now() - Number(id) * 1000
        };
        await setDoc(doc(db, "blogs", id), blogData);
        fetchedBlogs.push(blogData as Blog);
      }
    }

    // Always resolve images using the local bundled asset when no custom remote URL exists.
    const resolved = fetchedBlogs.map((b) => ({ ...b, image: resolveImage(b) }));
    // #endregion SEED_SCRIPT

    // Sort by strictly sequential ID mapping or timestamp
    // NOTE: When removing seed script, replace `resolved` with `fetchedBlogs` on the line below
    return resolved.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error("Firestore Blogs Fetch/Seed Error:", error);
    throw error;
  }
};

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const blogs = await fetchBlogs();
      return blogs.find((b) => b.slug === slug);
    },
    enabled: !!slug,
  });
};

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newBlog: Omit<Blog, "id" | "createdAt">) => {
      const newId = Date.now().toString();
      const blog: Blog = { ...newBlog, id: newId, createdAt: Date.now() };
      await setDoc(doc(db, "blogs", newId), blog);
      return blog;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedBlog: Blog) => {
      await updateDoc(doc(db, "blogs", updatedBlog.id), { ...updatedBlog });
      return updatedBlog;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", variables.slug] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "blogs", id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
