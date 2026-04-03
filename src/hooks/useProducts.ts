import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
// #region SEED_SCRIPT — remove this import when deleting seed logic
import { Product, products as initialProducts } from "@/data/products";
// #endregion SEED_SCRIPT

// #region SEED_SCRIPT — delete localImageBySlug + resolveImage when removing seed logic
// (also change import above to: import { Product } from "@/data/products")
// Build a slug → local image map from the statically-imported assets.
const localImageBySlug: Record<string, string> = Object.fromEntries(
  initialProducts.map((p) => [p.slug, p.image])
);

/**
 * Resolves the correct image for a product:
 * - If the product has a custom remote image (uploaded by admin to a cloud URL), use it.
 * - Otherwise fall back to the locally-bundled static asset by slug.
 */
const resolveImage = (product: Product): string => {
  const isRemote = product.image?.startsWith("http") || product.image?.startsWith("data:");
  if (isRemote) return product.image;
  return localImageBySlug[product.slug] ?? product.image;
};
// #endregion SEED_SCRIPT

// Fetch products from Firestore, seeding defaults if the collection is empty.
const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const fetchedProducts: Product[] = [];
  querySnapshot.forEach((docSnap) => {
    fetchedProducts.push({ id: docSnap.id, ...docSnap.data() } as Product);
  });

  // #region SEED_SCRIPT — delete this block + replace `resolved` with `fetchedProducts` below
  // Seed strategy: if Firestore has no products, push the initial static ones.
  if (fetchedProducts.length === 0) {
    console.log("Seeding initial products to Firebase...");
    for (const prod of initialProducts) {
      const { id, ...rest } = prod;
      await setDoc(doc(db, "products", id), { ...rest, id });
      fetchedProducts.push(prod);
    }
  }

  // Always resolve images using the local bundled asset when no custom remote URL exists.
  const resolved = fetchedProducts.map((p) => ({ ...p, image: resolveImage(p) }));
  // #endregion SEED_SCRIPT

  // NOTE: When removing seed script, replace `resolved` with `fetchedProducts` on the line below
  return resolved.sort((a, b) => Number(a.id) - Number(b.id));
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct: Omit<Product, "id">) => {
      const newId = Date.now().toString();
      const product = { ...newProduct, id: newId };
      await setDoc(doc(db, "products", newId), product);
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedProduct: Product) => {
      await updateDoc(doc(db, "products", updatedProduct.id), { ...updatedProduct });
      return updatedProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "products", id));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
