export interface Payment {
  id: string;
  customerId: string;
  customerName: string;
  schemeName: string;
  amount: number;
  date: string;
  method: "upi" | "card" | "cash" | "netbanking";
  status: "success" | "pending" | "failed";
  transactionId: string;
}
