import axios from "axios";
import { Payment } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Fetch all customers for dropdown
 */
export const getCustomers = async () => {
  try {
    const res = await api.get("/api/customers");
    return res.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
};

/**
 * Fetch all payments
 */
export const getAllPayments = async () => {
  try {
    const res = await api.get("/api/payments");
    return res.data;
  } catch (error) {
    console.error("Error fetching all payments:", error);
    return [];
  }
};

/**
 * Fetch payments by specific date
 */
export const getPaymentsByDate = async (date: string) => {
  try {
    const res = await api.get(`/api/payments/by-date/${date}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching payments by date:", error);
    return [];
  }
};

/**
 * Create a new payment
 */
export const addPayment = async (payload: any) => {
  try {
    const res = await api.post("/api/payments", {
      customerId: payload.customerId,
      amount: payload.amount,
      mode: payload.mode,
      date: payload.date,
      notes: payload.notes || null,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
};

/**
 * Update an existing payment
 */
export const updatePayment = async (id: string, payload: any) => {
  try {
    const res = await api.put(`/api/payments/${id}`, {
      amount: payload.amount,
      mode: payload.mode,
      date: payload.date,
      notes: payload.notes || null,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};

/**
 * Delete a payment
 */
export const deletePayment = async (id: string) => {
  try {
    const res = await api.delete(`/api/payments/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
};
