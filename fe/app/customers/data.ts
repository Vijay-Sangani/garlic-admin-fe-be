export async function getCustomers() {
  const { apiFetch } = await import("@/lib/api");
  return apiFetch("/api/customers", { cache: "no-store" });
}
