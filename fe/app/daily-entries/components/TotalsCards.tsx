"use client";

import { FC } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TotalsCardsProps } from "../types";

const TotalsCards: FC<TotalsCardsProps> = ({ totalGarlic, totalAmount }) => (
  <div className="grid gap-4 md:grid-cols-3">
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Garlic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{totalGarlic} kg</div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
      </CardContent>
    </Card>
  </div>
);

export default TotalsCards;
