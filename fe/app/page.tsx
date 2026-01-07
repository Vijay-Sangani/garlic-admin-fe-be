import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, IndianRupee, AlertCircle, ReceiptText, Package } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Header title="Dashboard" subtitle="Overview of your wholesale business" />
        <main className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">24</div>
                <p className="text-xs text-muted-foreground">Active accounts</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Monthly Sales
                </CardTitle>
                <IndianRupee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">₹1,24,500</div>
                <p className="text-xs text-primary">+12.5% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Outstanding Amount
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">₹18,750</div>
                <p className="text-xs text-muted-foreground">From 8 customers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Transactions
                </CardTitle>
                <ReceiptText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">142</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Item-wise Sales */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Garlic Sales - Current Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-end gap-2">
                    <div className="text-4xl font-bold text-primary">850</div>
                    <div className="text-lg text-muted-foreground mb-1">kg</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Average: ₹146/kg</div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[85%] rounded-full bg-primary"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    85% of monthly target (1000 kg)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Green Peas Sales - Current Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-end gap-2">
                    <div className="text-4xl font-bold text-primary">620</div>
                    <div className="text-lg text-muted-foreground mb-1">kg</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Average: ₹92/kg</div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[77%] rounded-full bg-accent"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    77% of monthly target (800 kg)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
