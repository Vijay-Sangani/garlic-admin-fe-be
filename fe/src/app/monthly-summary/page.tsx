import { JSX } from "react";

import { DataTable, Header, StatCard } from "@/src/components";

const customerSummary = [
  {
    customer: "Rajesh Kumar",
    garlic: "2,450",
    peas: "1,250",
    revenue: "₹3,45,670",
    pending: "₹45,230",
  },
  {
    customer: "Priya Sharma",
    garlic: "3,120",
    peas: "2,340",
    revenue: "₹4,89,200",
    pending: "₹12,500",
  },
  {
    customer: "Amit Patel",
    garlic: "1,890",
    peas: "980",
    revenue: "₹2,34,560",
    pending: "₹8,900",
  },
];

const MonthlySummaryPage = (): JSX.Element => {
  const rows = customerSummary.map((item) => [
    item.customer,
    `${item.garlic} kg`,
    `${item.peas} kg`,
    item.revenue,
    item.pending,
  ]);

  return (
    <div>
      <Header title="Monthly Summary" />
      <div className="p-6 space-y-6">
        {/* Month Selector */}
        <div className="flex items-center gap-4">
          <select className="px-4 py-3 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option>January 2025</option>
            <option>December 2024</option>
            <option>November 2024</option>
          </select>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Export Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 21C12 21 7 16 7 11.5C7 8.5 9 6 12 6C12 6 12 3 15 3C18 3 19 5 19 7C19 9 17 11 15 11C15 11 17 13 17 15.5C17 18 15 21 12 21Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
            subtitle="This month"
            title="Total Garlic Sold"
            value="45,230 kg"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="9" r="2" strokeWidth={2} />
                <circle cx="15" cy="15" r="2" strokeWidth={2} />
                <path
                  d="M6 6C6 4 8 2 12 2C16 2 18 4 18 6C18 8 16 10 12 10C8 10 6 8 6 6Z M6 18C6 16 8 14 12 14C16 14 18 16 18 18C18 20 16 22 12 22C8 22 6 20 6 18Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
            subtitle="This month"
            title="Total Green Peas Sold"
            value="32,890 kg"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
            subtitle="This month"
            title="Total Revenue"
            value="₹8,45,230"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            }
            subtitle="Outstanding"
            title="Total Pending"
            value="₹1,23,450"
          />
        </div>

        {/* Customer-wise Summary */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Customer-wise Monthly Summary</h3>
          </div>
          <DataTable
            headers={[
              "Customer",
              "Garlic Purchased",
              "Green Peas Purchased",
              "Total Revenue",
              "Pending Amount",
            ]}
            rows={rows}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlySummaryPage;
