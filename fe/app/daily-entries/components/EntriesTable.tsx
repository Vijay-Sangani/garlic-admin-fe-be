"use client";

import { Edit, Trash2, Loader2 } from "lucide-react";
import { JSX, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { EntriesTableProps, Entry } from "../types";

const EntriesTable = ({
  entries,
  onDelete,
  customersData,
  onUpdate,
}: EntriesTableProps): JSX.Element => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  const [date, setDate] = useState("");
  const [customerId, setCustomerId] = useState<string>("");
  const [garlicQty, setGarlicQty] = useState(0);
  const [garlicRate, setGarlicRate] = useState(0);

  const handleEditClick = (entry: Entry) => {
    setEditingId(entry.id);
    setDate(entry.date);
    setCustomerId(entry.customerId || "");
    setGarlicQty(entry.garlic);
    setGarlicRate(Math.round(entry.amount / entry.garlic));
    setIsEditOpen(true);
  };

  const totalAmount = useMemo(() => garlicQty * garlicRate, [garlicQty, garlicRate]);

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      await onUpdate(editingId, {
        date,
        customer: customerId,
        garlicQty,
        garlicRate,
      });
      setIsEditOpen(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Garlic (kg)</TableHead>
            <TableHead className="text-right">Total Amount (₹)</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {entries.length === 0 ? (
            <TableRow>
              <TableCell className="text-center py-6 text-muted-foreground" colSpan={5}>
                No data found for selected date
              </TableCell>
            </TableRow>
          ) : (
            entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{new Date(entry.date).toLocaleDateString("en-IN")}</TableCell>
                <TableCell className="font-medium">{entry.customer}</TableCell>
                <TableCell className="text-right">{entry.garlic}</TableCell>
                <TableCell className="text-right font-medium">
                  ₹{entry.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button onClick={() => handleEditClick(entry)} size="sm" variant="ghost">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button onClick={() => onDelete(entry.id)} size="sm" variant="ghost">
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog onOpenChange={setIsEditOpen} open={isEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
            <DialogDescription>Update the daily sales entry</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input onChange={(e) => setDate(e.target.value)} type="date" value={date} />
            </div>

            <div className="space-y-2">
              <Label>Customer</Label>
              <Select onValueChange={setCustomerId} value={customerId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customersData.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Garlic Qty (kg)</Label>
                <Input
                  onChange={(e) => setGarlicQty(Number(e.target.value))}
                  type="number"
                  value={garlicQty}
                />
              </div>
              <div className="space-y-2">
                <Label>Garlic Rate (₹/kg)</Label>
                <Input
                  onChange={(e) => setGarlicRate(Number(e.target.value))}
                  type="number"
                  value={garlicRate}
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-lg font-bold">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full" onClick={handleSaveChanges} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EntriesTable;
