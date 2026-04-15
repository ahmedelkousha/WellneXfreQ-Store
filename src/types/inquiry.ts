export type InquiryStatus = "new" | "read" | "archived";

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  productOfInterest: string;
  message: string;
  status: InquiryStatus;
  source: string;
  currency?: string;
  createdAt: Date;
}
