"use client";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Loader2 } from "lucide-react";

const payments = [
  {
    id: 1,
    date: "2026-01-05",
    customer: "Priya Sharma",
    amount: 12000,
    mode: "UPI",
    notes: "Full payment",
  },
  {
    id: 2,
    date: "2026-01-04",
    customer: "Vikram Singh",
    amount: 8500,
    mode: "Cash",
    notes: "Partial payment",
  },
  {
    id: 3,
    date: "2026-01-03",
    customer: "Rajesh Kumar",
    amount: 5000,
    mode: "Bank Transfer",
    notes: "Account cleared",
  },
  {
    id: 4,
    date: "2026-01-02",
    customer: "Amit Patel",
    amount: 15000,
    mode: "UPI",
    notes: "Monthly settlement",
  },
  {
    id: 5,
    date: "2026-01-01",
    customer: "Sunita Verma",
    amount: 3200,
    mode: "Cash",
    notes: "Advance payment",
  },
];

const customersData = [
  { id: 1, name: "Rajesh Kumar", mobile: "9876543210" },
  { id: 2, name: "Priya Sharma", mobile: "9876543211" },
  { id: 3, name: "Amit Patel", mobile: "9876543212" },
  { id: 4, name: "Sunita Verma", mobile: "9876543213" },
  { id: 5, name: "Vikram Singh", mobile: "9876543214" },
];

export default function PaymentsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleRecordPayment = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: "Payment Recorded",
      description: "Payment has been recorded successfully.",
    });
  };

  const handleDelete = async (id: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast({
      title: "Payment Deleted",
      description: "Payment record has been removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Payments" subtitle="Record and track customer payments" />
        <main className="p-6 space-y-6">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Record New Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="space-y-2">
                  <Label htmlFor="payment-customer">Customer</Label>
                  <Select>
                    <SelectTrigger id="payment-customer">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customersData.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id.toString()}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Amount (₹)</Label>
                  <Input id="payment-amount" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-mode">Payment Mode</Label>
                  <Select>
                    <SelectTrigger id="payment-mode">
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-date">Date</Label>
                  <Input id="payment-date" type="date" defaultValue="2026-01-06" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-notes">Notes</Label>
                  <Input id="payment-notes" placeholder="Optional notes" />
                </div>
              </div>
              <Button
                className="mt-4 w-full md:w-auto"
                onClick={handleRecordPayment}
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? "Recording..." : "Record Payment"}
              </Button>
            </CardContent>
          </Card>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{new Date(payment.date).toLocaleDateString("en-IN")}</TableCell>
                      <TableCell className="font-medium">{payment.customer}</TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {payment.mode}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{payment.notes}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(payment.id)}
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
