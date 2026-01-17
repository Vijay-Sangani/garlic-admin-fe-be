"use client";

import { Package, TrendingUp, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { fetchMonthlyData } from "./data";
import Header from "@/components/header";

function MonthlySummaryPage() {
  const [data, setData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchMonthlyData();
      setData(fetchedData);
    } catch (err) {
      setError(`Failed to load data: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadData();
  }, []);

  // Refetch data when page becomes visible (user navigates back)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const availableMonths = Object.keys(data);
  const currentMonthKey = availableMonths[currentMonthIndex];
  const currentMonth = data[currentMonthKey];
  const lastMonth = currentMonth?.previous;

  const totalGarlic =
    currentMonth?.data?.reduce((sum: number, item: any) => sum + item.garlic, 0) || 0;

  const totalRevenue =
    currentMonth?.data?.reduce((sum: number, item: any) => sum + item.revenue, 0) || 0;
  const totalPending =
    currentMonth?.data?.reduce((sum: number, item: any) => sum + item.pending, 0) || 0;

  const garlicChange = lastMonth?.totalGarlic
    ? ((totalGarlic - lastMonth.totalGarlic) / lastMonth.totalGarlic) * 100
    : 0;

  const revenueChange = lastMonth?.totalRevenue
    ? ((totalRevenue - lastMonth.totalRevenue) / lastMonth.totalRevenue) * 100
    : 0;
  const pendingChange = lastMonth?.totalPending
    ? ((totalPending - lastMonth.totalPending) / lastMonth.totalPending) * 100
    : 0;

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
            <Button
              variant="ghost"
              size="sm"
              onClick={loadData}
              disabled={isLoading}
              className="ml-auto"
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </div>
        <main className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">❌ Error</p>
              <p>{error}</p>
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">⏳ Loading data...</p>
            </div>
          ) : availableMonths.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">
                📭 No data available. Please add entries in Daily Entries.
              </p>
            </div>
          ) : (
            <>
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
                      Last month: {lastMonth?.totalGarlic || 0} kg
                      <span
                        className={garlicChange >= 0 ? "text-primary ml-1" : "text-accent ml-1"}
                      >
                        ({garlicChange > 0 ? "+" : ""}
                        {garlicChange.toFixed(1)}%)
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
                      ₹{mounted ? totalRevenue.toLocaleString("en-IN") : totalRevenue}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last month: ₹
                      {mounted
                        ? (lastMonth?.totalRevenue || 0).toLocaleString("en-IN")
                        : lastMonth?.totalRevenue || 0}
                      <span
                        className={revenueChange >= 0 ? "text-primary ml-1" : "text-accent ml-1"}
                      >
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
                      ₹{mounted ? totalPending.toLocaleString("en-IN") : totalPending}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last month: ₹
                      {mounted
                        ? (lastMonth?.totalPending || 0).toLocaleString("en-IN")
                        : lastMonth?.totalPending || 0}
                      <span
                        className={pendingChange < 0 ? "text-primary ml-1" : "text-accent ml-1"}
                      >
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
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="text-right">Garlic (kg)</TableHead>
                          <TableHead className="text-right">Revenue (₹)</TableHead>
                          <TableHead className="text-right">Pending (₹)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentMonth?.data?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.entries?.length > 0
                                ? mounted
                                  ? new Date(item.entries[0].date).toLocaleDateString("en-IN")
                                  : item.entries[0].date
                                : "-"}
                            </TableCell>
                            <TableCell className="font-medium">{item.customer}</TableCell>
                            <TableCell className="text-right">{item.garlic}</TableCell>
                            <TableCell className="text-right font-medium">
                              ₹{mounted ? item.revenue.toLocaleString("en-IN") : item.revenue}
                            </TableCell>
                            <TableCell className="text-right">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={
                                        item.pending > 0
                                          ? "text-accent font-medium cursor-help"
                                          : "text-green-600 font-medium"
                                      }
                                    >
                                      ₹
                                      {mounted
                                        ? item.pending.toLocaleString("en-IN")
                                        : item.pending}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs space-y-1">
                                      <p>Revenue: ₹{item.revenue.toLocaleString("en-IN")}</p>
                                      <p>Pending: ₹{item.pending.toLocaleString("en-IN")}</p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-muted/50 font-semibold">
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell className="text-right">{totalGarlic}</TableCell>
                          <TableCell className="text-right">
                            ₹{mounted ? totalRevenue.toLocaleString("en-IN") : totalRevenue}
                          </TableCell>
                          <TableCell className="text-right text-accent">
                            ₹{mounted ? totalPending.toLocaleString("en-IN") : totalPending}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default MonthlySummaryPage;
