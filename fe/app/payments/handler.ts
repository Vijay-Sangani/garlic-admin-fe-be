import { useEffect, useState } from "react";
import { addPayment, deletePayment, getPaymentsByDate, updatePayment } from "./data";
import { Payment } from "./types";

export const usePaymentHandler = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const data = await getPaymentsByDate(date);
      setPayments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [date]);

  const handleAdd = async (payload: any) => {
    await addPayment(payload);
    fetchPayments();
  };

  const handleEdit = (payment: Payment) => {
    setSelectedPayment(payment); // modal prefill
  };

  const handleUpdate = async (id: string, payload: any) => {
    await updatePayment(id, payload);
    setSelectedPayment(null);
    fetchPayments();
  };

  const handleDelete = async (id: string) => {
    await deletePayment(id);
    fetchPayments();
  };

  return {
    date,
    setDate,
    payments,
    loading,
    selectedPayment,
    handleAdd,
    handleEdit,
    handleUpdate,
    handleDelete,
  };
};
