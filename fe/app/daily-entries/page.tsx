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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, CalendarIcon, Loader2 } from "lucide-react";

const entries = [
  { id: 1, date: "2026-01-06", customer: "Rajesh Kumar", garlic: 25, peas: 15, amount: 5025 },
  { id: 2, date: "2026-01-06", customer: "Priya Sharma", garlic: 18, peas: 22, amount: 4652 },
  { id: 3, date: "2026-01-05", customer: "Amit Patel", garlic: 32, peas: 12, amount: 5776 },
  { id: 4, date: "2026-01-05", customer: "Sunita Verma", garlic: 15, peas: 20, amount: 4030 },
  { id: 5, date: "2026-01-04", customer: "Vikram Singh", garlic: 28, peas: 18, amount: 5744 },
];

const customersData = [
  { id: 1, name: "Rajesh Kumar", mobile: "9876543210" },
  { id: 2, name: "Priya Sharma", mobile: "9876543211" },
  { id: 3, name: "Amit Patel", mobile: "9876543212" },
  { id: 4, name: "Sunita Verma", mobile: "9876543213" },
  { id: 5, name: "Vikram Singh", mobile: "9876543214" },
];

export default function DailyEntriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const totalGarlic = entries.reduce((sum, entry) => sum + entry.garlic, 0);
  const totalPeas = entries.reduce((sum, entry) => sum + entry.peas, 0);
  const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);

  const handleSaveEntry = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsOpen(false);
    toast({
      title: "Entry Added",
      description: "Daily entry has been saved successfully.",
    });
  };

  const handleDelete = async (id: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast({
      title: "Entry Deleted",
      description: "Daily entry has been removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Daily Entries" subtitle="Track daily sales transactions" />
        <main className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="date" defaultValue="2026-01-06" className="pl-10 w-48" />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Customers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                {customersData.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id.toString()}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1" />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Daily Entry</DialogTitle>
                  <DialogDescription>Record a new sales transaction</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="entry-date">Date</Label>
                    <Input id="entry-date" type="date" defaultValue="2026-01-06" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <Select>
                      <SelectTrigger id="customer">
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="garlic-qty">Garlic Qty (kg)</Label>
                      <Input id="garlic-qty" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="garlic-rate">Garlic Rate (₹/kg)</Label>
                      <Input id="garlic-rate" type="number" placeholder="146" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="peas-qty">Green Peas Qty (kg)</Label>
                      <Input id="peas-qty" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="peas-rate">Peas Rate (₹/kg)</Label>
                      <Input id="peas-rate" type="number" placeholder="92" />
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="text-lg font-bold text-foreground">₹0</span>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleSaveEntry} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? "Saving..." : "Save Entry"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Totals Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Garlic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalGarlic} kg</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Green Peas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalPeas} kg</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  ₹{totalAmount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entries Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Garlic (kg)</TableHead>
                  <TableHead className="text-right">Green Peas (kg)</TableHead>
                  <TableHead className="text-right">Total Amount (₹)</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell className="font-medium">{entry.customer}</TableCell>
                    <TableCell className="text-right">{entry.garlic}</TableCell>
                    <TableCell className="text-right">{entry.peas}</TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{entry.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(entry.id)}>
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </main>
      </div>
    </div>
  );
}
