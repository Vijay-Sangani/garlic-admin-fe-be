"use client";

import { Users, IndianRupee, AlertCircle, ReceiptText, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { APIErrorDisplay } from "@/components/api-error-display";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/api";
import { useMonth } from "@/lib/MonthContext";

interface DashboardData {
  error: string | null;
  garlicKg: number;
  isLoading: boolean;
  monthlySales: number;
  outstandingAmount: number;
  totalCustomers: number;
  totalTransactions: number;
}

interface CustomerRow {
  customerId: string;
  customerName: string;
  totalAmount: number;
  totalKg: number;
  totalPaid: number;
  totalPending: number;
}

const DashboardPage: FC = () => {
  const router = useRouter();
  const { selectedMonth } = useMonth();
  const [data, setData] = useState<DashboardData>({
    totalCustomers: 0,
    monthlySales: 0,
    outstandingAmount: 0,
    totalTransactions: 0,
    garlicKg: 0,
    isLoading: true,
    error: null,
  });
  const [customerRows, setCustomerRows] = useState<CustomerRow[]>([]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadDashboardData = async () => {
      setData((prev) => ({ ...prev, isLoading: true }));
      try {
        // Fetch customers
        const customers = await apiFetch("/api/customers");
        const totalCustomers = customers.length;

        // Fetch daily entries
        const entries = await apiFetch("/api/daily-entries");

        // Fetch payments
        const payments = await apiFetch("/api/payments");

        // Calculate selected month data
        const selectedMonthNum = `${String(selectedMonth.getMonth() + 1).padStart(2, "0")}`;
        const selectedYear = String(selectedMonth.getFullYear());

        const selectedMonthEntries = entries.filter((entry: any) => {
          const entryDate = new Date(entry.date);
          const entryMonth = String(entryDate.getMonth() + 1).padStart(2, "0");
          const entryYear = String(entryDate.getFullYear());
          return entryMonth === selectedMonthNum && entryYear === selectedYear;
        });

        const monthlySales = selectedMonthEntries.reduce(
          (sum: number, entry: any) => sum + (entry.amount || 0),
          0
        );

        const garlicKg = selectedMonthEntries.reduce(
          (sum: number, entry: any) => sum + (entry.garlic || 0),
          0
        );

        const totalTransactions = selectedMonthEntries.length;

        // Calculate outstanding/pending amount for SELECTED month only
        const selectedMonthPayments = payments.filter((payment: any) => {
          if (!payment.customerId) return false;
          const paymentDate = new Date(payment.date);
          const paymentMonth = String(paymentDate.getMonth() + 1).padStart(2, "0");
          const paymentYear = String(paymentDate.getFullYear());
          return paymentMonth === selectedMonthNum && paymentYear === selectedYear;
        });

        const totalPaid = selectedMonthPayments.reduce(
          (sum: number, payment: any) => sum + (payment.amount || 0),
          0
        );

        const outstandingAmount = Math.max(0, monthlySales - totalPaid);

        // Create a map of customer ID to customer name
        const customerNameMap = new Map<string, string>();
        customers.forEach((customer: any) => {
          customerNameMap.set(customer._id, customer.name);
        });

        // Build customer breakdown table
        const customerMap = new Map<string, CustomerRow>();

        // Process entries grouped by customer
        selectedMonthEntries.forEach((entry: any) => {
          const customerId = entry.customerId?._id || entry.customerId;
          const customerName = customerNameMap.get(customerId) || "Unknown";

          if (!customerMap.has(customerId)) {
            customerMap.set(customerId, {
              customerId,
              customerName,
              totalKg: 0,
              totalAmount: 0,
              totalPaid: 0,
              totalPending: 0,
            });
          }

          const row = customerMap.get(customerId)!;
          row.totalKg += entry.garlic || 0;
          row.totalAmount += entry.amount || 0;
        });

        // Process payments for the selected month
        selectedMonthPayments.forEach((payment: any) => {
          const customerId = payment.customerId?._id || payment.customerId;
          const customerName = customerNameMap.get(customerId) || "Unknown";

          if (!customerMap.has(customerId)) {
            customerMap.set(customerId, {
              customerId,
              customerName,
              totalKg: 0,
              totalAmount: 0,
              totalPaid: 0,
              totalPending: 0,
            });
          }

          const row = customerMap.get(customerId)!;
          row.totalPaid += payment.amount || 0;
        });

        // Calculate pending for each customer
        customerMap.forEach((row) => {
          row.totalPending = Math.max(0, row.totalAmount - row.totalPaid);
        });

        const customerRowsArray = Array.from(customerMap.values());

        setData({
          totalCustomers,
          monthlySales,
          outstandingAmount,
          totalTransactions,
          garlicKg,
          isLoading: false,
          error: null,
        });
        setCustomerRows(customerRowsArray);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load dashboard data";
        console.error("Dashboard error:", err);
        setData((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    };

    loadDashboardData();
  }, [selectedMonth, router]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header
          title="Dashboard"
          subtitle="Overview of your wholesale business"
          showMonthSelector
        />
        <main className="p-6 space-y-6">
          {data.error && <APIErrorDisplay error={data.error} onRetry={() => loadDashboardData()} />}

          {data.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Customers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{data.totalCustomers}</div>
                    <p className="text-xs text-muted-foreground">Active accounts</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Monthly Sales
                    </CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      ₹{data.monthlySales.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-primary">Current month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Outstanding Amount
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent">
                      ₹{data.outstandingAmount.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-muted-foreground">To be collected</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Transactions
                    </CardTitle>
                    <ReceiptText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">
                      {data.totalTransactions}
                    </div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Item-wise Sales */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      Garlic Sales - Current Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-end gap-2">
                        <div className="text-4xl font-bold text-primary">{data.garlicKg}</div>
                        <div className="text-lg text-muted-foreground mb-1">kg</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {data.garlicKg > 0
                          ? `Average: ₹${(data.monthlySales / data.garlicKg).toFixed(0)}/kg`
                          : "No sales yet"}
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.min((data.garlicKg / 2500) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round((data.garlicKg / 2500) * 100)}% of target (2500 kg)
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Customer Breakdown Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Breakdown - Current Month</CardTitle>
                </CardHeader>
                <CardContent>
                  {customerRows.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions in this month
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer Name</TableHead>
                            <TableHead className="text-right">Total KG</TableHead>
                            <TableHead className="text-right">Total Amount (₹)</TableHead>
                            <TableHead className="text-right">Paid (₹)</TableHead>
                            <TableHead className="text-right">Pending (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerRows.map((row) => (
                            <TableRow key={row.customerId}>
                              <TableCell className="font-medium">{row.customerName}</TableCell>
                              <TableCell className="text-right">{row.totalKg}</TableCell>
                              <TableCell className="text-right">
                                ₹{row.totalAmount.toLocaleString("en-IN")}
                              </TableCell>
                              <TableCell className="text-right text-green-600">
                                ₹{row.totalPaid.toLocaleString("en-IN")}
                              </TableCell>
                              <TableCell className="text-right text-accent">
                                ₹{row.totalPending.toLocaleString("en-IN")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
