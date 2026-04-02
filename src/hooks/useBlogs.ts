import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Blog } from "@/types/blog";
import { blogPosts as initialBlogs } from "@/data/blogs";

const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const fetchedBlogs: Blog[] = [];
    
    querySnapshot.forEach((docSnap) => {
      fetchedBlogs.push({ ...(docSnap.data() as Blog), id: docSnap.id });
    });

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

    // Sort by strictly sequential ID mapping or timestamp
    return fetchedBlogs.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
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
