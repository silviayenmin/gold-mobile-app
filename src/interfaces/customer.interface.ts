export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  aadharNumber?: string;
  panNumber?: string;
  joinedAt: string;
  status: "active" | "inactive";
  activeSchemes: number;
  totalSavings: number;
}
