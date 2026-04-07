export interface Country {
  code: string;
  name: string;
  dialCode: string;
}

// Minimal but reasonably complete list; extend as needed.
export const countries: Country[] = [
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "PL", name: "Poland", dialCode: "+48" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "ID", name: "Indonesia", dialCode: "+62" },
];

