import { apiFetch } from "@/lib/api";
import type { Entry } from "../daily-entries/types";

export async function fetchMonthlyData() {
  const entries: Entry[] = await apiFetch("/api/daily-entries", {
    cache: "no-store",
    headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
  });

  // Fetch payment data to calculate pending for each month
  let allPayments: any[] = [];
  try {
    allPayments = await apiFetch("/api/payments", {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache, no-store, must-revalidate" },
    });
  } catch (err) {
    console.error("Failed to fetch payments:", err);
  }

  // If no entries and no payments, return empty
  if ((!entries || entries.length === 0) && (!allPayments || allPayments.length === 0)) {
    return {};
  }

  // Group entries by month if they exist
  const grouped = entries && entries.length > 0 ? groupEntriesByMonth(entries) : {};

  // Enrich with pending amounts and payment data
  await enrichWithPendingAmounts(grouped, allPayments);

  return grouped;
}

async function enrichWithPendingAmounts(grouped: Record<string, any>, allPayments: any[]) {
  // If there are no entries, we still need to show payment data by creating entries from payments
  if (!Object.keys(grouped).length && allPayments.length > 0) {
    // Group payments by month
    allPayments.forEach((payment: any) => {
      if (!payment.customerId) return; // Skip payments without customer

      const paymentDate = new Date(payment.date);
      const monthKey = paymentDate.toLocaleString("en-US", { month: "long", year: "numeric" });

      if (!grouped[monthKey]) {
        grouped[monthKey] = {
          data: [],
          entries: [],
        };
      }

      // Add customer entry if not exists
      const customerName = payment.customerId.name || "Unknown";
      const existingCustomer = grouped[monthKey].data.find(
        (item: any) => item.customer === customerName
      );

      if (!existingCustomer) {
        grouped[monthKey].data.push({
          customer: customerName,
          garlic: 0,
          revenue: 0,
          pending: 0,
          entries: [],
        });
      }
    });
  }

  // For each month, calculate pending for each customer
  Object.keys(grouped).forEach((monthKey) => {
    // Get month and year from monthKey
    const [monthName, yearStr] = monthKey.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${yearStr}`).getMonth();
    const year = parseInt(yearStr);

    // Calculate pending for each customer in this month
    grouped[monthKey].data.forEach((item: any) => {
      const customerEntries = item.entries;
      const firstEntry = customerEntries[0];
      const customerId = firstEntry?.customerId;

      // Get revenue for this customer in this month from entries
      const monthRevenue = customerEntries.reduce(
        (sum: number, entry: Entry) => sum + (entry.amount || 0),
        0
      );

      // Get payments for this customer in this month
      const monthPayments = allPayments.filter((payment: any) => {
        // Skip payments with null customerId
        if (!payment.customerId) {
          return false;
        }

        const paymentDate = new Date(payment.date);
        // Handle both cases: customerId as string or object with _id
        const paymentCustomerId =
          typeof payment.customerId === "string" ? payment.customerId : payment.customerId?._id;

        // Match by customerId if available, otherwise by customer name
        if (customerId) {
          return (
            paymentCustomerId === customerId &&
            paymentDate.getMonth() === monthIndex &&
            paymentDate.getFullYear() === year
          );
        } else {
          // Match by customer name if no customerId
          return (
            payment.customerId.name === item.customer &&
            paymentDate.getMonth() === monthIndex &&
            paymentDate.getFullYear() === year
          );
        }
      });

      const monthPaid = monthPayments.reduce(
        (sum: number, payment: any) => sum + (payment.amount || 0),
        0
      );

      // Pending = Revenue - Paid
      item.pending = Math.max(0, monthRevenue - monthPaid);
    });
  });
}

function groupEntriesByMonth(entries: Entry[]) {
  const grouped: Record<string, any> = {};

  entries.forEach((entry) => {
    const date = new Date(entry.date);
    const monthKey = date.toLocaleString("en-US", { month: "long", year: "numeric" });

    if (!grouped[monthKey]) {
      grouped[monthKey] = {
        data: [],
        entries: [],
      };
    }

    grouped[monthKey].entries.push(entry);
  });

  // Group entries by customer for the summary view
  Object.keys(grouped).forEach((month) => {
    const customerMap: Record<string, any> = {};

    grouped[month].entries.forEach((entry: Entry) => {
      const customerName = entry.customer;
      if (!customerMap[customerName]) {
        customerMap[customerName] = {
          customer: customerName,
          garlic: 0,
          revenue: 0,
          pending: 0,
          entries: [],
        };
      }
      customerMap[customerName].garlic += entry.garlic;
      customerMap[customerName].revenue += entry.amount;
      customerMap[customerName].entries.push(entry);
    });

    grouped[month].data = Object.values(customerMap);
  });

  // Calculate previous month data
  const monthKeys = Object.keys(grouped).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime();
  });

  monthKeys.forEach((month, index) => {
    const currentData = grouped[month].data;
    const totalGarlic = currentData.reduce((sum: number, item: any) => sum + item.garlic, 0);
    const totalRevenue = currentData.reduce((sum: number, item: any) => sum + item.revenue, 0);
    const totalPending = currentData.reduce((sum: number, item: any) => sum + item.pending, 0);

    if (index < monthKeys.length - 1) {
      const prevMonth = monthKeys[index + 1];
      const prevData = grouped[prevMonth].data;
      grouped[month].previous = {
        totalGarlic: prevData.reduce((sum: number, item: any) => sum + item.garlic, 0),
        totalRevenue: prevData.reduce((sum: number, item: any) => sum + item.revenue, 0),
        totalPending: prevData.reduce((sum: number, item: any) => sum + item.pending, 0),
      };
    } else {
      grouped[month].previous = {
        totalGarlic: 0,
        totalRevenue: 0,
        totalPending: 0,
      };
    }
  });

  return grouped;
}
