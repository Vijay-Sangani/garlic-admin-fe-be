/* eslint-disable max-lines-per-function */
"use client";

import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { getCustomers } from "./data";
import { handleSaveCustomer, handleSaveChanges, handleDeleteEntry } from "./handlers";
import { Customer, FlattenedRow } from "./types";
import Header from "@/components/header";

const CustomersContent = (): JSX.Element => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isViewMoreOpen, setViewMoreOpen] = useState(false);
  const [isSelectedEntry, setSelectedEntry] = useState<FlattenedRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 🔹 FORM STATE (LOGIC ONLY – UI SAME)
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [item, setItem] = useState("");
  const [address, setAddress] = useState("");
  const [editName, setEditName] = useState("");
  const [editItem, setEditItem] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    getCustomers().then(setCustomers);
  }, [router]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setMobile("");
      setItem("");
      setAddress("");
    }
  }, [isOpen]);

  const flattenedRows: FlattenedRow[] = customers.map((customer) => ({
    customerId: customer._id,
    id: customer._id,
    customerName: customer.name,
    mobile: customer.mobile,
    address: customer.address,
    // item: customer.entries.map((e) => e.item).join(", "),
    item: Array.isArray(customer.entries)
      ? customer.entries.map((e) => e.item).join(", ")
      : ((customer as any).item ?? ""),
  }));

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header subtitle="Manage your customer base" title="Customers" />
        <main className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-10" placeholder="Search by name or mobile..." />
            </div>
            {/* ADD CUSTOMER */}
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
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
                    <Input
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setMobile(value);
                      }}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      type="tel"
                      value={mobile}
                    />
                    {mobile && !/^[6-9][0-9]{9}$/.test(mobile) && (
                      <p className="text-sm text-red-500">
                        Please enter a valid Indian mobile number (10 digits, starting with 6-9)
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item">Item</Label>
                    <Input
                      id="item"
                      onChange={(e) => setItem(e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter complete address"
                    />
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      isSaving ||
                      !name.trim() ||
                      !mobile.trim() ||
                      !item.trim() ||
                      !address.trim() ||
                      !/^[6-9][0-9]{9}$/.test(mobile)
                    }
                    onClick={() =>
                      void handleSaveCustomer(setIsSaving, setIsOpen, toast, {
                        name,
                        mobile,
                        address,
                        item,
                      })
                    }
                  >
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? "Saving..." : "Save Customer"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {/* TABLE */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flattenedRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.customerName}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.item}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          onClick={() => {
                            setSelectedEntry(row);
                            setEditName(row.customerName);
                            setEditItem(row.item);
                            setEditAddress(row.address ?? "");
                            setViewMoreOpen(true);
                          }}
                          size="sm"
                          variant="outline"
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
          {/* EDIT / DELETE */}
          <Dialog onOpenChange={setViewMoreOpen} open={isViewMoreOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Entry Details</DialogTitle>
                <DialogDescription>Edit or delete this entry</DialogDescription>
              </DialogHeader>
              {isSelectedEntry && (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Customer Name</Label>
                    <Input onChange={(e) => setEditName(e.target.value)} value={editName} />
                  </div>
                  <div className="space-y-2">
                    <Label>Mobile</Label>
                    <Input disabled value={isSelectedEntry.mobile} />
                  </div>
                  <div className="space-y-2">
                    <Label>Item</Label>
                    <Input onChange={(e) => setEditItem(e.target.value)} value={editItem} />
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input onChange={(e) => setEditAddress(e.target.value)} value={editAddress} />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      disabled={isSaving || isDeleting}
                      onClick={() =>
                        void handleSaveChanges(
                          setIsSaving,
                          setViewMoreOpen,
                          toast,
                          isSelectedEntry.customerId,
                          {
                            name: editName,
                            address: editAddress,
                            entries: editItem.split(",").map((i) => ({ item: i.trim() })),
                          }
                        )
                      }
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
                      className="flex-1"
                      disabled={isSaving || isDeleting}
                      onClick={() =>
                        void handleDeleteEntry(
                          setIsDeleting,
                          setViewMoreOpen,
                          toast,
                          isSelectedEntry.customerId
                        )
                      }
                      variant="destructive"
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
};

export default CustomersContent;
