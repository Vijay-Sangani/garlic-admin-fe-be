export interface Customer {
  id: string;
  name: string;
}

export interface Entry {
  amount: number;
  customer: string; // customer name for display
  date: string;
  garlic: number;
  id: string;
  customerId?: string; // Mongo id (optional until API includes it)
}

export interface FiltersBarProps {
  customersData: Customer[];
  isOpen: boolean;
  isSaving: boolean;
  onDateChange: (date: string) => void;
  onSave: (payload: {
    customer: string;
    date: string;
    garlicQty: number;
    garlicRate: number;
  }) => void;
  selectedDate: string;
  setIsOpen: (open: boolean) => void;
  preSelectedCustomerId?: string;
  onCustomerSelect?: (customerId: string) => void;
}

export interface TotalsCardsProps {
  totalAmount: number;
  totalGarlic: number;
}

export interface EntriesTableProps {
  customersData: Customer[];
  entries: Entry[];
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    payload: { customer: string; date: string; garlicQty: number; garlicRate: number }
  ) => void;
}
