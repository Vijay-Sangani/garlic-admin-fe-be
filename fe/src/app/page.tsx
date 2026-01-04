import { JSX } from "react";

import { Header, StatCard } from "../components";

const DashboardPage = (): JSX.Element => (
  <div>
    <Header title="Dashboard" />
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          subtitle="Active accounts"
          title="Total Customers"
          trend={{ value: "+12%", positive: true }}
          value="142"
        />
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
          subtitle="Fresh entries today"
          title="Today Garlic Entry"
          value="1,245 kg"
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
          subtitle="Fresh entries today"
          title="Today Green Peas Entry"
          value="856 kg"
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
          subtitle="Total revenue this month"
          title="Monthly Sales"
          trend={{ value: "+24%", positive: true }}
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
          subtitle="Pending collections"
          title="Outstanding Payments"
          trend={{ value: "-8%", positive: true }}
          value="₹1,23,450"
        />
        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          }
          subtitle="This month"
          title="Total Transactions"
          value="1,542"
        />
      </div>

      {/* Chart Placeholder */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Overview</h3>
        <div className="h-64 bg-accent/20 rounded-xl flex items-center justify-center border border-border/50">
          <p className="text-muted-foreground">Chart visualization area</p>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardPage;
