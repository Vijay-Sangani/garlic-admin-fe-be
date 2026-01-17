export type PaymentMode = "cash" | "upi" | "bank";

export interface Customer {
  _id: string;
  name: string;
  mobile: string;
  address?: string;
}

export interface Payment {
  _id: string;
  customerId: Customer | null;
  amount: number;
  mode: PaymentMode;
  date: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}
