import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Inquiry, InquiryStatus } from "@/types/inquiry";

export function useInquiries() {
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Inquiry;
      });
    },
    retry: false, // Prevent endless retries if permissions initially block access until configured
  });
}

export function useAddInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inquiryData: Omit<Inquiry, "id" | "status" | "createdAt">) => {
      const newDocRef = doc(collection(db, "inquiries"));
      const payload = {
        ...inquiryData,
        status: "new" as InquiryStatus,
        createdAt: new Date(),
      };
      await setDoc(newDocRef, payload);
      return { id: newDocRef.id, ...payload } as Inquiry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: InquiryStatus }) => {
      const docRef = doc(db, "inquiries", id);
      await updateDoc(docRef, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export function useDeleteInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, "inquiries", id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
