export interface Entry {
  item: string;
}

export interface Customer {
  _id: string; // MongoDB ID
  name: string;
  mobile: string;
  address?: string;
  entries: Entry[];
}

export interface FlattenedRow {
  id: string;
  customerId: string;
  customerName: string;
  mobile: string;
  address?: string;
  item: string;
}
