import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { CreateOrderInput, Order, OrderItem, OrderProductId } from "@/types/order";
import { ORDER_PRODUCTS } from "@/types/order";

const COLLECTION_NAME = "orders";

function buildOrderItems(inputItems: CreateOrderInput["items"]): OrderItem[] {
  return inputItems.map((item) => {
    const product = ORDER_PRODUCTS.find((p) => p.id === item.productId as OrderProductId);
    if (!product) {
      throw new Error(`Unknown product id: ${item.productId}`);
    }
    const lineSubtotal = product.price * item.quantity;
    const linePhAmount = (lineSubtotal * product.phPercent) / 100;
    const lineTotal = lineSubtotal + linePhAmount;

    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      phPercent: product.phPercent,
      quantity: item.quantity,
      lineSubtotal,
      linePhAmount,
      lineTotal,
    };
  });
}

function computeTotals(items: OrderItem[]) {
  const subtotal = items.reduce((acc, item) => acc + item.lineSubtotal, 0);
  const totalPh = items.reduce((acc, item) => acc + item.linePhAmount, 0);
  const total = items.reduce((acc, item) => acc + item.lineTotal, 0);

  return { subtotal, totalPh, total };
}

export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      return snapshot.docs.map((snap) => {
        const data = snap.data() as any;
        return {
          id: snap.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : new Date().toISOString(),
          status: data.status || "new",
        } as Order;
      });
    },
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      const items = buildOrderItems(input.items);
      const { subtotal, totalPh, total } = computeTotals(items);

      const payload = {
        firstName: input.firstName,
        middleName: input.middleName || null,
        lastName: input.lastName,
        email: input.email,
        phoneCountryCode: input.phoneCountryCode,
        phoneNumber: input.phoneNumber,
        preferredUsername: input.preferredUsername || null,
        idNumber: input.idNumber,
        gender: input.gender,
        
        // Personal Address
        personalStreetAddress: input.personalStreetAddress,
        personalCity: input.personalCity,
        personalState: input.personalState,
        personalCountry: input.personalCountry,
        personalPostalCode: input.personalPostalCode,

        // Recipient info
        isRecipientSameAsPersonal: input.isRecipientSameAsPersonal,
        recipientName: input.recipientName || null,
        recipientPhone: input.recipientPhone || null,
        recipientStreetAddress: input.recipientStreetAddress || null,
        recipientCity: input.recipientCity || null,
        recipientState: input.recipientState || null,
        recipientCountry: input.recipientCountry || null,
        recipientPostalCode: input.recipientPostalCode || null,

        items,
        subtotal,
        totalPh,
        total,
        currency: "USD",
        source: "website-order",
        status: "new" as const,
        createdAt: new Date(),
      };

      const newDocRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(newDocRef, payload);

      return {
        id: newDocRef.id,
        ...payload,
        createdAt: (payload.createdAt as Date).toISOString(),
      } as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: Order["status"];
    }) => {
      await updateDoc(doc(db, COLLECTION_NAME, id), { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

