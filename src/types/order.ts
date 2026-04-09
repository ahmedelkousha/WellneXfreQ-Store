export type OrderProductId =
  | "tera-p90"
  | "tera-p90-kit"
  | "galaxy-g-one"
  | "shaken-massager"
  | "vitality-wand"
  | "h-plus-bar"
  | "bundle-tera-shaken"
  | "bundle-tera-galaxy"
  | "bundle-tera-galaxy-shaken";

export interface OrderProductConfig {
  id: OrderProductId;
  name: string;
  price: number;
  phPercent: number;
  isBundle?: boolean;
}

export const ORDER_PRODUCTS: OrderProductConfig[] = [
  { id: "tera-p90", name: "Tera-P90", price: 1000, phPercent: 10 },
  { id: "tera-p90-kit", name: "Tera-P90 Kit", price: 1500, phPercent: 10 },
  { id: "galaxy-g-one", name: "Galaxy G-One", price: 500, phPercent: 10 },
  { id: "shaken-massager", name: "Shaken Massager", price: 1000, phPercent: 10 },
  { id: "vitality-wand", name: "Vitality Wand", price: 600, phPercent: 10 },
  { id: "h-plus-bar", name: "H+ Bar", price: 600, phPercent: 10 },
  // Bundles
  { id: "bundle-tera-shaken", name: "Tera-P90+ & Shaken Massager", price: 2500, phPercent: 10, isBundle: true },
  { id: "bundle-tera-galaxy", name: "Tera-P90+ & Galaxy G-One", price: 2000, phPercent: 10, isBundle: true },
  { id: "bundle-tera-galaxy-shaken", name: "Tera-P90+ & Galaxy G-One & Shaken Massager", price: 3000, phPercent: 10, isBundle: true },
];

export interface OrderItem {
  productId: OrderProductId;
  name: string;
  unitPrice: number;
  phPercent: number;
  quantity: number;
  lineSubtotal: number;
  linePhAmount: number;
  lineTotal: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "new" | "read" | "archived";
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  idNumber: string;
  gender: "male" | "female";
  
  // Personal Address
  personalStreetAddress: string;
  personalCity: string;
  personalState: string;
  personalCountry: string;
  personalPostalCode: string;

  // Recipient info
  isRecipientSameAsPersonal: boolean;
  recipientName?: string;
  recipientPhone?: string;
  recipientStreetAddress?: string;
  recipientCity?: string;
  recipientState?: string;
  recipientCountry?: string;
  recipientPostalCode?: string;

  items: OrderItem[];
  subtotal: number;
  totalPh: number;
  total: number;
  currency: string;
  source: string | null;
}

export interface CreateOrderInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  idNumber: string;
  gender: "male" | "female";

  // Personal Address
  personalStreetAddress: string;
  personalCity: string;
  personalState: string;
  personalCountry: string;
  personalPostalCode: string;

  // Recipient info
  isRecipientSameAsPersonal: boolean;
  recipientName?: string;
  recipientPhone?: string;
  recipientStreetAddress?: string;
  recipientCity?: string;
  recipientState?: string;
  recipientCountry?: string;
  recipientPostalCode?: string;

  items: {
    productId: OrderProductId;
    quantity: number;
  }[];
}

