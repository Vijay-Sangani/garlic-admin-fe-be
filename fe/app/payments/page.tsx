"use client";

import { Edit, Trash2, Loader2, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getCustomers, getAllPayments, addPayment, updatePayment, deletePayment } from "./data";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/header";

interface Customer {
  _id: string;
  name: string;
  mobile: string;
  address?: string;
}

interface Payment {
  _id: string;
  customerId: Customer | null;
  amount: number;
  mode: "cash" | "upi" | "bank";
  date: string;
  notes?: string;
}

export default function PaymentsPage() {
  const { toast } = useToast();

  // Form States
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);

  // Form field states
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("");
  const [date, setDate] = useState(getTodayDate());
  const [notes, setNotes] = useState("");

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPayment, setEditPayment] = useState<Payment | null>(null);

  // Edit form states
  const [editAmount, setEditAmount] = useState("");
  const [editMode, setEditMode] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editNotes, setEditNotes] = useState("");

  function getTodayDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
    fetchPayments();
  }, []);

  // Filter payments by selected date
  useEffect(() => {
    const filtered = payments.filter((payment) => {
      const paymentDate = new Date(payment.date).toISOString().split("T")[0];
      return paymentDate === date;
    });
    setFilteredPayments(filtered);
  }, [payments, date]);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast({
        title: "Error",
        description: "Failed to load customers",
        variant: "destructive",
      });
    }
  };

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPayments();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast({
        title: "Error",
        description: "Failed to load payments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecordPayment = async () => {
    if (!selectedCustomer || !amount || !mode || !date) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await addPayment({
        customerId: selectedCustomer,
        amount: parseFloat(amount),
        mode,
        date,
        notes: notes || null,
      });

      // Reset form
      setSelectedCustomer("");
      setAmount("");
      setMode("");
      setDate(getTodayDate());
      setNotes("");

      // Refresh payments
      await fetchPayments();

      toast({
        title: "Success",
        description: "Payment recorded successfully",
      });
    } catch (error) {
      console.error("Error recording payment:", error);
      toast({
        title: "Error",
        description: "Failed to record payment",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditClick = (payment: Payment) => {
    setEditPayment(payment);
    setEditAmount(payment.amount.toString());
    setEditMode(payment.mode);
    setEditDate(payment.date.split("T")[0]);
    setEditNotes(payment.notes || "");
    setIsEditOpen(true);
  };

  const handleEditSave = async () => {
    if (!editPayment || !editAmount || !editMode || !editDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      await updatePayment(editPayment._id, {
        amount: parseFloat(editAmount),
        mode: editMode,
        date: editDate,
        notes: editNotes || null,
      });

      setIsEditOpen(false);
      setEditPayment(null);
      await fetchPayments();

      toast({
        title: "Success",
        description: "Payment updated successfully",
      });
    } catch (error) {
      console.error("Error updating payment:", error);
      toast({
        title: "Error",
        description: "Failed to update payment",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (paymentId: string) => {
    if (!confirm("Are you sure you want to delete this payment?")) return;

    setIsSaving(true);
    try {
      await deletePayment(paymentId);
      await fetchPayments();

      toast({
        title: "Success",
        description: "Payment deleted successfully",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast({
        title: "Error",
        description: "Failed to delete payment",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Payments" subtitle="Record and track customer payments" />
        <main className="p-6 space-y-6">
          {/* Payment Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Record New Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {/* Customer Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="payment-customer">Customer *</Label>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger id="payment-customer">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer._id} value={customer._id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <Label htmlFor="payment-amount">Amount (₹) *</Label>
                  <Input
                    id="payment-amount"
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Payment Mode */}
                <div className="space-y-2">
                  <Label htmlFor="payment-mode">Payment Mode *</Label>
                  <Select value={mode} onValueChange={setMode}>
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

                {/* Date Input */}
                <div className="space-y-2">
                  <Label htmlFor="payment-date">Date *</Label>
                  <Input
                    id="payment-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                {/* Notes Input */}
                <div className="space-y-2">
                  <Label htmlFor="payment-notes">Notes</Label>
                  <Input
                    id="payment-notes"
                    placeholder="Optional notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
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

          {/* Date Filter and Totals */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="filter-date">Filter by Date</Label>
              <Input
                id="filter-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Display current date info */}
            <div className="flex items-end">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Showing {filteredPayments.length} payment
                  {filteredPayments.length !== 1 ? "s" : ""} for{" "}
                  {new Date(date).toLocaleDateString("en-IN")}
                </AlertDescription>
              </Alert>
            </div>

            {/* Summary Cards */}
            <div className="space-y-1 md:col-span-2">
              <p className="text-sm font-medium">
                Total Amount: ₹
                {filteredPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History ({new Date(date).toLocaleDateString("en-IN")})</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  No payments recorded for this date
                </div>
              ) : (
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
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment._id}>
                        <TableCell>{new Date(payment.date).toLocaleDateString("en-IN")}</TableCell>
                        <TableCell className="font-medium">
                          {payment.customerId?.name || "—"}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ₹{payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="capitalize">{payment.mode}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {payment.notes || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditClick(payment)}
                              disabled={isSaving}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(payment._id)}
                              disabled={isSaving}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Edit Payment Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Payment</DialogTitle>
          </DialogHeader>

          {editPayment && (
            <div className="space-y-4">
              <div>
                <Label>Customer</Label>
                <Input value={editPayment.customerId?.name || "—"} disabled className="mt-1" />
              </div>

              <div>
                <Label htmlFor="edit-amount">Amount (₹) *</Label>
                <Input
                  id="edit-amount"
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-mode">Payment Mode *</Label>
                <Select value={editMode} onValueChange={setEditMode}>
                  <SelectTrigger id="edit-mode" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-date">Date *</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Input
                  id="edit-notes"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Optional notes"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleEditSave} disabled={isSaving} className="flex-1">
                  {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={() => setIsEditOpen(false)}
                  variant="outline"
                  disabled={isSaving}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
