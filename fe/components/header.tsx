"use client";

import { Bell, Settings, LogOut, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMonth } from "@/lib/MonthContext";

interface HeaderProps {
  title: string;
  showMonthSelector?: boolean;
  subtitle?: string;
}

const Header: FC<HeaderProps> = ({ title, subtitle, showMonthSelector = false }) => {
  const router = useRouter();
  const { selectedMonth, setSelectedMonth, monthString } = useMonth();
  const [isOpen, setIsOpen] = useState(false);
  const [pickerMonth, setPickerMonth] = useState(selectedMonth.getMonth());
  const [pickerYear, setPickerYear] = useState(selectedMonth.getFullYear());

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonth(newDate);
  };

  const handleToday = () => {
    setSelectedMonth(new Date());
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  const handlePickDate = () => {
    const newDate = new Date(pickerYear, pickerMonth, 1);
    setSelectedMonth(newDate);
    setIsOpen(false);
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

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {showMonthSelector && (
            <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
              <Button
                onClick={handlePreviousMonth}
                size="sm"
                title="Previous Month"
                variant="ghost"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover onOpenChange={setIsOpen} open={isOpen}>
                <PopoverTrigger asChild>
                  <Button className="min-w-35" size="sm" title="Select Month/Year" variant="ghost">
                    <Calendar className="mr-2 h-4 w-4" />
                    {monthString}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-72">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Month</label>
                      <div className="grid grid-cols-3 gap-2">
                        {months.map((month, index) => (
                          <Button
                            className="text-xs"
                            key={month}
                            onClick={() => setPickerMonth(index)}
                            size="sm"
                            variant={pickerMonth === index ? "default" : "outline"}
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
                            className="text-xs"
                            key={year}
                            onClick={() => setPickerYear(year)}
                            size="sm"
                            variant={pickerYear === year ? "default" : "outline"}
                          >
                            {year}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={handleToday} size="sm" variant="outline">
                        Today
                      </Button>
                      <Button className="flex-1" onClick={handlePickDate} size="sm">
                        Select
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button onClick={handleNextMonth} size="sm" title="Next Month" variant="ghost">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button size="icon" title="Notifications" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
          <Button onClick={handleSettings} size="icon" title="Settings" variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            className="text-destructive hover:text-destructive"
            onClick={handleLogout}
            size="icon"
            title="Logout"
            variant="ghost"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
