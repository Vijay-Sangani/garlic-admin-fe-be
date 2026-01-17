"use client";

import { createContext, useContext, useState, FC, PropsWithChildren } from "react";

interface MonthContextType {
  monthString: string;
  selectedMonth: Date;
  setSelectedMonth: (date: Date) => void;
}

const MonthContext = createContext<MonthContextType | undefined>(undefined);

export const MonthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => new Date());

  const monthString = selectedMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth, monthString }}>
      {children}
    </MonthContext.Provider>
  );
};

export const useMonth = (): MonthContextType => {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error("useMonth must be used within MonthProvider");
  }
  return context;
};
