"use client";

import { Plus, CalendarIcon, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FiltersBarProps } from "../types";

const FiltersBar: FC<FiltersBarProps> = ({
  customersData,
  isOpen,
  setIsOpen,
  isSaving,
  onSave,
  selectedDate,
  onDateChange,
  preSelectedCustomerId,
  onCustomerSelect,
}) => {
  const [date, setDate] = useState(selectedDate);
  const [customerId, setCustomerId] = useState<string>("");
  const [garlicQty, setGarlicQty] = useState<string>("");
  const [garlicRate, setGarlicRate] = useState<string>("");
  const [filterCustomerId, setFilterCustomerId] = useState<string>("all");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(new Date(selectedDate).getMonth());
  const [pickerYear, setPickerYear] = useState(new Date(selectedDate).getFullYear());
  const [pickerDay, setPickerDay] = useState(new Date(selectedDate).getDate());

  useEffect(() => {
    if (isOpen) {
      setDate(selectedDate);
      setCustomerId(preSelectedCustomerId || "");
      setGarlicQty("");
      setGarlicRate("");
    }
  }, [isOpen, selectedDate, preSelectedCustomerId]);

  const totalAmount = useMemo(() => {
    const qty = garlicQty ? Number(garlicQty) : 0;
    const rate = garlicRate ? Number(garlicRate) : 0;
    return qty * rate;
  }, [garlicQty, garlicRate]);

  const canSave =
    Boolean(date) &&
    Boolean(customerId) &&
    Boolean(garlicQty) &&
    Boolean(garlicRate) &&
    Number(garlicQty) > 0 &&
    Number(garlicRate) > 0;

  const handlePreviousDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate.toISOString().split("T")[0]);
  };

  const handleNextDate = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate.toISOString().split("T")[0]);
  };

  const handleToday = () => {
    const today = new Date().toISOString().split("T")[0];
    onDateChange(today);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
  };

  const handlePickDate = () => {
    const newDate = new Date(pickerYear, pickerMonth, pickerDay);
    const dateStr = newDate.toISOString().split("T")[0];
    onDateChange(dateStr);
    setIsDatePickerOpen(false);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const days = Array.from({ length: getDaysInMonth(pickerMonth, pickerYear) }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
        <Button onClick={handlePreviousDate} size="sm" title="Previous Day" variant="ghost">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button className="min-w-40" size="sm" title="Select Date" variant="ghost">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDate(selectedDate)}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="center" className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Month</label>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <Button
                      key={month}
                      onClick={() => setPickerMonth(index)}
                      size="sm"
                      variant={pickerMonth === index ? "default" : "outline"}
                      className="text-xs"
                    >
                      {month.slice(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Year</label>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((year) => (
                    <Button
                      key={year}
                      onClick={() => setPickerYear(year)}
                      size="sm"
                      variant={pickerYear === year ? "default" : "outline"}
                      className="text-xs"
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Day</label>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day) => (
                    <Button
                      key={day}
                      onClick={() => setPickerDay(day)}
                      size="sm"
                      variant={pickerDay === day ? "default" : "outline"}
                      className="text-xs h-8 p-0"
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleToday} size="sm" variant="outline" className="flex-1">
                  Today
                </Button>
                <Button onClick={handlePickDate} size="sm" className="flex-1">
                  Select
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={handleNextDate} size="sm" title="Next Day" variant="ghost">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <Select
        value={filterCustomerId}
        onValueChange={(value) => {
          setFilterCustomerId(value);
          if (value === "all") {
            onCustomerSelect?.("");
          } else {
            onCustomerSelect?.(value);
          }
        }}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Customers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Customers</SelectItem>
          {customersData.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {customer.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <Dialog onOpenChange={setIsOpen} open={isOpen}>
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
                  onChange={(e) => setGarlicQty(e.target.value)}
                  placeholder="0"
                  type="number"
                  value={garlicQty}
                />
              </div>
              <div className="space-y-2">
                <Label>Garlic Rate (₹/kg)</Label>
                <Input
                  onChange={(e) => setGarlicRate(e.target.value)}
                  placeholder="146"
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
              {!canSave && (garlicQty === 0 || garlicRate === 0) && (
                <p className="text-xs text-destructive mt-2">
                  {garlicQty === 0 && garlicRate === 0 && "Please enter garlic quantity and rate"}
                  {garlicQty === 0 && garlicRate > 0 && "Please enter garlic quantity"}
                  {garlicQty > 0 && garlicRate === 0 && "Please enter garlic rate"}
                </p>
              )}
            </div>

            <Button
              className="w-full"
              disabled={isSaving || !canSave}
              onClick={() =>
                onSave({
                  date,
                  customer: customerId,
                  garlicQty: Number(garlicQty),
                  garlicRate: Number(garlicRate),
                })
              }
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FiltersBar;
