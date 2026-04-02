export type InquiryStatus = "new" | "read" | "archived";

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  productOfInterest?: string;
  message: string;
  source?: string;
  status: InquiryStatus;
  createdAt: Date;
}
