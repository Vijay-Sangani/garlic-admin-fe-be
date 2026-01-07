"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, TrendingUp, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Sample data for different months
const monthlyData: Record<string, any> = {
  "January 2026": {
    data: [
      {
        customer: "Rajesh Kumar",
        garlic: 125,
        peas: 80,
        revenue: 25650,
        pending: 2500,
      },
      {
        customer: "Priya Sharma",
        garlic: 95,
        peas: 120,
        revenue: 24930,
        pending: 0,
      },
      {
        customer: "Amit Patel",
        garlic: 180,
        peas: 65,
        revenue: 32260,
        pending: 4200,
      },
      {
        customer: "Sunita Verma",
        garlic: 75,
        peas: 95,
        revenue: 19690,
        pending: 1800,
      },
      {
        customer: "Vikram Singh",
        garlic: 145,
        peas: 110,
        revenue: 31260,
        pending: 0,
      },
    ],
    previous: {
      totalGarlic: 580,
      totalPeas: 420,
      totalRevenue: 125800,
      totalPending: 9500,
    },
  },
  "December 2025": {
    data: [
      {
        customer: "Rajesh Kumar",
        garlic: 115,
        peas: 75,
        revenue: 23450,
        pending: 1500,
      },
      {
        customer: "Priya Sharma",
        garlic: 105,
        peas: 95,
        revenue: 21930,
        pending: 1200,
      },
      {
        customer: "Amit Patel",
        garlic: 160,
        peas: 80,
        revenue: 29260,
        pending: 3500,
      },
      {
        customer: "Sunita Verma",
        garlic: 85,
        peas: 85,
        revenue: 18690,
        pending: 1800,
      },
      {
        customer: "Vikram Singh",
        garlic: 115,
        peas: 85,
        revenue: 24470,
        pending: 1500,
      },
    ],
    previous: {
      totalGarlic: 550,
      totalPeas: 390,
      totalRevenue: 118500,
      totalPending: 8200,
    },
  },
  "November 2025": {
    data: [
      {
        customer: "Rajesh Kumar",
        garlic: 105,
        peas: 70,
        revenue: 21950,
        pending: 1200,
      },
      {
        customer: "Priya Sharma",
        garlic: 90,
        peas: 85,
        revenue: 19430,
        pending: 800,
      },
      {
        customer: "Amit Patel",
        garlic: 150,
        peas: 75,
        revenue: 27760,
        pending: 2800,
      },
      {
        customer: "Sunita Verma",
        garlic: 80,
        peas: 80,
        revenue: 17690,
        pending: 1600,
      },
      {
        customer: "Vikram Singh",
        garlic: 125,
        peas: 80,
        revenue: 25670,
        pending: 1800,
      },
    ],
    previous: {
      totalGarlic: 520,
      totalPeas: 370,
      totalRevenue: 112000,
      totalPending: 7500,
    },
  },
};

export default function MonthlySummaryPage() {
  const availableMonths = Object.keys(monthlyData);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const currentMonthKey = availableMonths[currentMonthIndex];
  const currentMonth = monthlyData[currentMonthKey];
  const lastMonth = currentMonth.previous;

  const totalGarlic = currentMonth.data.reduce((sum: number, item: any) => sum + item.garlic, 0);
  const totalPeas = currentMonth.data.reduce((sum: number, item: any) => sum + item.peas, 0);
  const totalRevenue = currentMonth.data.reduce((sum: number, item: any) => sum + item.revenue, 0);
  const totalPending = currentMonth.data.reduce((sum: number, item: any) => sum + item.pending, 0);

  const garlicChange = ((totalGarlic - lastMonth.totalGarlic) / lastMonth.totalGarlic) * 100;
  const peasChange = ((totalPeas - lastMonth.totalPeas) / lastMonth.totalPeas) * 100;
  const revenueChange = ((totalRevenue - lastMonth.totalRevenue) / lastMonth.totalRevenue) * 100;
  const pendingChange = ((totalPending - lastMonth.totalPending) / lastMonth.totalPending) * 100;

  const goToPreviousMonth = () => {
    if (currentMonthIndex < availableMonths.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div>
          <Header title="Monthly Summary" />
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousMonth}
              disabled={currentMonthIndex >= availableMonths.length - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium min-w-35 text-center">{currentMonthKey}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextMonth}
              disabled={currentMonthIndex <= 0}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <main className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Garlic Sold
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalGarlic} kg</div>
                <p className="text-xs text-muted-foreground">
                  Last month: {lastMonth.totalGarlic} kg
                  <span className={garlicChange >= 0 ? "text-primary ml-1" : "text-accent ml-1"}>
                    ({garlicChange > 0 ? "+" : ""}
                    {garlicChange.toFixed(1)}%)
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Green Peas Sold
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{totalPeas} kg</div>
                <p className="text-xs text-muted-foreground">
                  Last month: {lastMonth.totalPeas} kg
                  <span className={peasChange >= 0 ? "text-primary ml-1" : "text-accent ml-1"}>
                    ({peasChange > 0 ? "+" : ""}
                    {peasChange.toFixed(1)}%)
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last month: ₹{lastMonth.totalRevenue.toLocaleString()}
                  <span className={revenueChange >= 0 ? "text-primary ml-1" : "text-accent ml-1"}>
                    ({revenueChange > 0 ? "+" : ""}
                    {revenueChange.toFixed(1)}%)
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Pending
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  ₹{totalPending.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last month: ₹{lastMonth.totalPending.toLocaleString()}
                  <span className={pendingChange < 0 ? "text-primary ml-1" : "text-accent ml-1"}>
                    ({pendingChange > 0 ? "+" : ""}
                    {pendingChange.toFixed(1)}%)
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Customer-wise Monthly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Garlic (kg)</TableHead>
                    <TableHead className="text-right">Green Peas (kg)</TableHead>
                    <TableHead className="text-right">Revenue (₹)</TableHead>
                    <TableHead className="text-right">Pending (₹)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentMonth.data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.customer}</TableCell>
                      <TableCell className="text-right">{item.garlic}</TableCell>
                      <TableCell className="text-right">{item.peas}</TableCell>
                      <TableCell className="text-right font-medium">
                        ₹{item.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            item.pending > 0 ? "text-accent font-medium" : "text-muted-foreground"
                          }
                        >
                          ₹{item.pending.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">{totalGarlic}</TableCell>
                    <TableCell className="text-right">{totalPeas}</TableCell>
                    <TableCell className="text-right">₹{totalRevenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-accent">
                      ₹{totalPending.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
