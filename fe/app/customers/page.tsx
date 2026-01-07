"use client";

import { Suspense, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";

const customersData = [
  {
    id: 1,
    name: "Rajesh Kumar",
    mobile: "9876543210",
    entries: [
      { id: 101, date: "2026-01-05", item: "Garlic", quantity: 50, rate: 120, amount: 6000 },
      { id: 102, date: "2026-01-04", item: "Green Peas", quantity: 30, rate: 80, amount: 2400 },
    ],
  },
  {
    id: 2,
    name: "Priya Sharma",
    mobile: "9876543211",
    entries: [
      { id: 201, date: "2026-01-06", item: "Garlic", quantity: 40, rate: 120, amount: 4800 },
    ],
  },
  {
    id: 3,
    name: "Amit Patel",
    mobile: "9876543212",
    entries: [
      { id: 301, date: "2026-01-03", item: "Green Peas", quantity: 60, rate: 80, amount: 4800 },
      { id: 302, date: "2026-01-02", item: "Garlic", quantity: 45, rate: 120, amount: 5400 },
      { id: 303, date: "2026-01-01", item: "Garlic", quantity: 25, rate: 120, amount: 3000 },
    ],
  },
  {
    id: 4,
    name: "Sunita Verma",
    mobile: "9876543213",
    entries: [
      { id: 401, date: "2026-01-05", item: "Green Peas", quantity: 35, rate: 80, amount: 2800 },
    ],
  },
  {
    id: 5,
    name: "Vikram Singh",
    mobile: "9876543214",
    entries: [
      { id: 501, date: "2026-01-06", item: "Garlic", quantity: 55, rate: 120, amount: 6600 },
      { id: 502, date: "2026-01-04", item: "Green Peas", quantity: 40, rate: 80, amount: 3200 },
    ],
  },
];

function CustomersContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMoreOpen, setViewMoreOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const flattenedRows = customersData.flatMap((customer) =>
    customer.entries.map((entry) => ({
      customerId: customer.id,
      customerName: customer.name,
      mobile: customer.mobile,
      ...entry,
    }))
  );

  const handleSaveCustomer = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsOpen(false);
    toast({
      title: "Customer Added",
      description: "New customer has been added successfully.",
    });
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setViewMoreOpen(false);
    toast({
      title: "Changes Saved",
      description: "Entry has been updated successfully.",
    });
  };

  const handleDeleteEntry = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsDeleting(false);
    setViewMoreOpen(false);
    toast({
      title: "Entry Deleted",
      description: "Entry has been removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Customers" subtitle="Manage your customer base" />
        <main className="p-6 space-y-6">
          {/* Top Bar */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search by name or mobile..." className="pl-10" />
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Customer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>
                    Enter customer details to add them to your database
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input id="mobile" placeholder="10-digit mobile number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="Enter complete address" />
                  </div>
                  <Button className="w-full" onClick={handleSaveCustomer} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? "Saving..." : "Save Customer"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Quantity (kg)</TableHead>
                  <TableHead className="text-right">Rate (₹/kg)</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flattenedRows.map((row) => (
                  <TableRow key={`${row.customerId}-${row.id}`}>
                    <TableCell className="font-medium">{row.customerName}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.item}</TableCell>
                    <TableCell className="text-right">{row.quantity}</TableCell>
                    <TableCell className="text-right">₹{row.rate}</TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{row.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedEntry(row);
                            setViewMoreOpen(true);
                          }}
                        >
                          View More
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Dialog open={viewMoreOpen} onOpenChange={setViewMoreOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Entry Details</DialogTitle>
                <DialogDescription>Edit or delete this entry</DialogDescription>
              </DialogHeader>
              {selectedEntry && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-customer-name">Customer Name</Label>
                    <Input id="edit-customer-name" defaultValue={selectedEntry.customerName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input id="edit-date" type="date" defaultValue={selectedEntry.date} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-item">Item</Label>
                    <Input id="edit-item" defaultValue={selectedEntry.item} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-quantity">Quantity (kg)</Label>
                      <Input
                        id="edit-quantity"
                        type="number"
                        defaultValue={selectedEntry.quantity}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-rate">Rate (₹/kg)</Label>
                      <Input id="edit-rate" type="number" defaultValue={selectedEntry.rate} />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      onClick={handleSaveChanges}
                      disabled={isSaving || isDeleting}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Edit className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={handleDeleteEntry}
                      disabled={isSaving || isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Entry
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <Suspense fallback={null}>
      <CustomersContent />
    </Suspense>
  );
}
