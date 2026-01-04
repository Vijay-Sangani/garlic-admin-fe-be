"use client";

import { Plus, X } from "lucide-react";
import { JSX, useState } from "react";

import { DataTable, Header } from "@/src/components";

const initialCustomers = [
  {
    name: "Rajesh Kumar",
    mobile: "+91 98765 43210",
    garlic: "2,450",
    peas: "1,250",
    outstanding: "₹45,230",
  },
  {
    name: "Priya Sharma",
    mobile: "+91 98765 43211",
    garlic: "3,120",
    peas: "2,340",
    outstanding: "₹12,500",
  },
  {
    name: "Amit Patel",
    mobile: "+91 98765 43212",
    garlic: "1,890",
    peas: "980",
    outstanding: "₹8,900",
  },
  {
    name: "Sunita Verma",
    mobile: "+91 98765 43213",
    garlic: "4,560",
    peas: "3,200",
    outstanding: "₹23,450",
  },
  {
    name: "Vikram Singh",
    mobile: "+91 98765 43214",
    garlic: "2,100",
    peas: "1,500",
    outstanding: "₹15,670",
  },
];

const CustomersPage = (): JSX.Element => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    garlic: "0",
    peas: "0",
    outstanding: "₹0",
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    setCustomers([...customers, formData]);

    setFormData({
      name: "",
      mobile: "",
      garlic: "0",
      peas: "0",
      outstanding: "₹0",
    });

    setIsModalOpen(false);
  };

  const rows = customers.map((customer) => [
    customer.name,
    customer.mobile,
    `${customer.garlic} kg`,
    `${customer.peas} kg`,
    customer.outstanding,
    <button
      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
      key={customer.mobile}
    >
      View
    </button>,
  ]);

  return (
    <div>
      <Header title="Customers" />
      <div className="p-6 space-y-6">
        {/* Search Bar and Add Customer Button */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              className="w-full px-4 py-3 pl-12 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search customers..."
              type="text"
            />
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>
          <button
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-5 h-5" />
            Add Customer
          </button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <DataTable
            headers={[
              "Customer Name",
              "Mobile",
              "Total Garlic (kg)",
              "Total Green Peas (kg)",
              "Outstanding",
              "Action",
            ]}
            rows={rows}
          />
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1 to {customers.length} of {customers.length} customers
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-sm font-medium">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding new customer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Add New Customer</h2>
              <button
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Customer Name
                </label>
                <input
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter customer name"
                  required
                  type="text"
                  value={formData.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mobile Number
                </label>
                <input
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                  type="tel"
                  value={formData.mobile}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Outstanding Amount
                </label>
                <input
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setFormData({ ...formData, outstanding: e.target.value })}
                  placeholder="₹0"
                  type="text"
                  value={formData.outstanding}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  className="flex-1 px-4 py-3 bg-background border border-border rounded-xl hover:bg-accent transition-colors font-medium"
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                  type="submit"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
