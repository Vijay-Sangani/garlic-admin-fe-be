"use client";

import { JSX, useEffect, useMemo, useState } from "react";

import Sidebar from "@/components/sidebar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";

import { addDailyEntry, deleteDailyEntry, fetchEntriesByDate, updateDailyEntry } from "./api";
import EntriesTable from "./components/EntriesTable";
import FiltersBar from "./components/FiltersBar";
import TotalsCards from "./components/TotalsCards";
import { Entry, Customer } from "./types";
import Header from "@/components/header";

const DailyEntriesPage = (): JSX.Element => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [customersData, setCustomersData] = useState<Customer[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preSelectedCustomerId, setPreSelectedCustomerId] = useState<string>("");

  const { toast } = useToast();

  const loadCustomers = async () => {
    const customers = await apiFetch<{ _id: string; name: string }[]>("/api/customers", {
      cache: "no-store",
    });
    setCustomersData(customers.map((c) => ({ id: c._id, name: c.name })));
  };

  const loadEntries = async (date: string) => {
    setIsLoading(true);
    try {
      const apiEntries = await fetchEntriesByDate(date);
      setEntries(apiEntries);
    } catch (e) {
      toast({ title: "Failed to load entries", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCustomers();
  }, []);

  useEffect(() => {
    void loadEntries(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const filteredEntries = useMemo(
    () => entries.filter((entry) => entry.date === selectedDate),
    [entries, selectedDate]
  );

  const handleSaveEntry = async (payload: {
    customer: string;
    date: string;
    garlicQty: number;
    garlicRate: number;
  }) => {
    try {
      setIsSaving(true);
      await addDailyEntry(payload);
      setIsOpen(false);
      toast({ title: "Entry Added", description: "Daily entry saved" });
      await loadEntries(selectedDate);
    } catch (e) {
      toast({ title: "Failed to save entry", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDailyEntry(id);
      toast({ title: "Entry Deleted", variant: "destructive" });
      await loadEntries(selectedDate);
    } catch (e) {
      toast({ title: "Failed to delete entry", variant: "destructive" });
    }
  };

  const handleUpdate = async (
    id: string,
    payload: { date: string; customer: string; garlicQty: number; garlicRate: number }
  ) => {
    try {
      await updateDailyEntry(id, payload);
      toast({ title: "Entry Updated", description: "Daily entry updated" });
      await loadEntries(selectedDate);
    } catch (e) {
      toast({ title: "Failed to update entry", variant: "destructive" });
    }
  };

  const totals = useMemo(() => {
    return filteredEntries.reduce(
      (acc, entry) => {
        acc.totalGarlic += entry.garlic;
        acc.totalAmount += entry.amount;
        return acc;
      },
      { totalGarlic: 0, totalAmount: 0 }
    );
  }, [filteredEntries]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Daily Entries" subtitle="Track daily sales transactions" />

        <main className="p-6 space-y-6">
          <FiltersBar
            customersData={customersData}
            isOpen={isOpen}
            isSaving={isSaving}
            onDateChange={setSelectedDate}
            onSave={handleSaveEntry}
            selectedDate={selectedDate}
            setIsOpen={setIsOpen}
            preSelectedCustomerId={preSelectedCustomerId}
            onCustomerSelect={setPreSelectedCustomerId}
          />
          <TotalsCards totalGarlic={totals.totalGarlic} totalAmount={totals.totalAmount} />
          <Card>
            <EntriesTable
              customersData={customersData}
              entries={isLoading ? [] : filteredEntries}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DailyEntriesPage;
