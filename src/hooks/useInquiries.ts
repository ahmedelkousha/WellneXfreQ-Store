import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Inquiry, InquiryStatus } from "@/types/inquiry";
import { sendEmail, EMAIL_TEMPLATES } from "@/lib/emailJS";

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
    mutationFn: async (inquiryData: Omit<Inquiry, "id" | "status" | "createdAt" | "source">) => {
      const newDocRef = doc(collection(db, "inquiries"));
      const payload = {
        ...inquiryData,
        source: "website-inquiry",
        status: "new" as InquiryStatus,
        createdAt: new Date(),
      };
      
      // Save to Firestore
      await setDoc(newDocRef, payload);

      // Send Email Notification
      try {
        await sendEmail(EMAIL_TEMPLATES.INQUIRY, {
          full_name: payload.fullName,
          email: payload.email,
          phone: payload.phone || "Not provided",
          product: payload.productOfInterest || "General Question",
          message: payload.message,
        });
      } catch (emailError) {
        console.error("Email notification failed, but data was saved to database:", emailError);
      }

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
