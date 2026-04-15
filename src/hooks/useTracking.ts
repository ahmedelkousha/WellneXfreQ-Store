import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { TrackingTool } from "@/types/tracking";

const COLLECTION_NAME = "tracking_tools";

export function useTrackingTools() {
  return useQuery({
    queryKey: ["tracking_tools"],
    queryFn: async () => {
      const q = query(collection(db, COLLECTION_NAME), orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TrackingTool[];
    }
  });
}

export function useAddTrackingTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool: Omit<TrackingTool, "id">) => {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...tool,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracking_tools"] });
    }
  });
}

export function useUpdateTrackingTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (tool: TrackingTool) => {
      const { id, ...data } = tool;
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracking_tools"] });
    }
  });
}

export function useDeleteTrackingTool() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracking_tools"] });
    }
  });
}
