import type { Dispatch, SetStateAction } from "react";

type ToastFn = (args: {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}) => void;

export const handleSaveCustomer = async (
  setIsSaving: Dispatch<SetStateAction<boolean>>,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  toast: ToastFn,
  payload: {
    name: string;
    mobile: string;
    address?: string;
    item: string;
  }
) => {
  try {
    setIsSaving(true);
    const { apiFetch } = await import("@/lib/api");
    await apiFetch("/api/customers", { method: "POST", json: payload });
    setIsOpen(false);
    window.location.reload();
  } finally {
    setIsSaving(false);
  }
};

export const handleSaveChanges = async (
  setIsSaving: Dispatch<SetStateAction<boolean>>,
  setViewMoreOpen: Dispatch<SetStateAction<boolean>>,
  toast: ToastFn,
  customerId: string,
  payload: {
    name: string;
    address?: string;
    entries: { item: string }[];
  }
) => {
  try {
    setIsSaving(true);
    const { apiFetch } = await import("@/lib/api");
    await apiFetch(`/api/customers/${customerId}`, { method: "PUT", json: payload });
    setViewMoreOpen(false);
    window.location.reload();
  } finally {
    setIsSaving(false);
  }
};

export const handleDeleteEntry = async (
  setIsDeleting: Dispatch<SetStateAction<boolean>>,
  setViewMoreOpen: Dispatch<SetStateAction<boolean>>,
  toast: ToastFn,
  customerId: string
) => {
  try {
    setIsDeleting(true);
    const { apiFetch } = await import("@/lib/api");
    await apiFetch(`/api/customers/${customerId}`, { method: "DELETE" });
    setViewMoreOpen(false);
    window.location.reload();
  } finally {
    setIsDeleting(false);
  }
};
