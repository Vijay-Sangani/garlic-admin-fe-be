import { JSX } from "react";

import { DataTable, Header } from "@/src/components";

const recentEntries = [
  {
    customer: "Rajesh Kumar",
    date: "2025-01-03",
    quantity: "245",
    rate: "₹85",
    total: "₹20,825",
  },
  {
    customer: "Priya Sharma",
    date: "2025-01-03",
    quantity: "180",
    rate: "₹85",
    total: "₹15,300",
  },
  {
    customer: "Amit Patel",
    date: "2025-01-02",
    quantity: "320",
    rate: "₹82",
    total: "₹26,240",
  },
];

const GarlicEntryPage = (): JSX.Element => {
  const rows = recentEntries.map((entry) => [
    entry.customer,
    entry.date,
    `${entry.quantity} kg`,
    entry.rate,
    entry.total,
  ]);

  return (
    <div>
      <Header title="Garlic Entry" />
      <div className="p-6 space-y-6">
        {/* Entry Form */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">New Garlic Entry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Select Customer
              </label>
              <select className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Choose customer...</option>
                <option>Rajesh Kumar</option>
                <option>Priya Sharma</option>
                <option>Amit Patel</option>
                <option>Sunita Verma</option>
                <option>Vikram Singh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date</label>
              <input
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue="2025-01-03"
                type="date"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantity (kg)
              </label>
              <input
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter quantity"
                type="number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Rate per kg (₹)
              </label>
              <input
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter rate"
                type="number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Total Amount</label>
              <input
                className="w-full px-4 py-3 bg-accent border border-border rounded-xl text-foreground font-semibold"
                disabled
                type="text"
                value="₹0.00"
              />
            </div>
          </div>
          <button className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium w-full md:w-auto">
            Save Entry
          </button>
        </div>

        {/* Recent Entries */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Garlic Entries</h3>
          </div>
          <DataTable headers={["Customer", "Date", "Quantity", "Rate", "Total"]} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default GarlicEntryPage;
