import { apiFetch } from "@/lib/api";

import type { Entry } from "./types";

export async function fetchEntriesByDate(date: string): Promise<Entry[]> {
  return apiFetch(`/api/daily-entries?date=${encodeURIComponent(date)}`, { cache: "no-store" });
}

export async function addDailyEntry(payload: {
  date: string;
  customer: string; // customerId
  garlicQty: number;
  garlicRate: number;
}): Promise<void> {
  await apiFetch("/api/daily-entries", { method: "POST", json: payload });
}

export async function updateDailyEntry(
  id: string,
  payload: { date: string; customer: string; garlicQty: number; garlicRate: number }
): Promise<void> {
  await apiFetch(`/api/daily-entries/${id}`, { method: "PUT", json: payload });
}

export async function deleteDailyEntry(id: string): Promise<void> {
  await apiFetch(`/api/daily-entries/${id}`, { method: "DELETE" });
}


