export interface Scheme {
  id: string;
  name: string;
  description: string;
  durationMonths: number;
  monthlyAmount: number;
  expectedGoldWeight?: number;
  status: "active" | "inactive";
  totalMembers: number;
  createdAt: string;
}

export interface CustomerScheme {
  id: string;
  customerId: string;
  schemeId: string;
  startDate: string;
  maturityDate: string;
  installmentsPaid: number;
  totalPaid: number;
  status: "ongoing" | "completed" | "closed";
}
