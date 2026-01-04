import { JSX } from "react";

import { DataTable, Header } from "@/src/components";

const paymentHistory = [
  {
    customer: "Rajesh Kumar",
    amount: "₹25,000",
    mode: "UPI",
    date: "2025-01-03",
    status: "Completed",
  },
  {
    customer: "Priya Sharma",
    amount: "₹15,000",
    mode: "Cash",
    date: "2025-01-02",
    status: "Completed",
  },
  {
    customer: "Amit Patel",
    amount: "₹30,000",
    mode: "Bank Transfer",
    date: "2025-01-02",
    status: "Completed",
  },
];

const PaymentsPage = (): JSX.Element => {
  const rows = paymentHistory.map((payment) => [
    payment.customer,
    payment.amount,
    payment.mode,
    payment.date,
    <span
      className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-success/20 text-success"
      key={payment.customer}
    >
      {payment.status}
    </span>,
  ]);

  return (
    <div>
      <Header title="Payments" />
      <div className="p-6 space-y-6">
        {/* Payment Form */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Record New Payment</h3>
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
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Amount (₹)
              </label>
              <input
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter amount"
                type="number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Payment Mode</label>
              <select className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Choose mode...</option>
                <option>Cash</option>
                <option>UPI</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes (Optional)
              </label>
              <textarea
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Add any notes..."
                rows={3}
              />
            </div>
          </div>
          <button className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium w-full md:w-auto">
            Record Payment
          </button>
        </div>

        {/* Payment History */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Payment History</h3>
          </div>
          <DataTable headers={["Customer", "Amount", "Mode", "Date", "Status"]} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
