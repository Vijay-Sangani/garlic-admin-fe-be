"use client";

import { FC, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface APIErrorProps {
  error: Error | string;
  onRetry?: () => void;
}

export const APIErrorDisplay: FC<APIErrorProps> = ({ error, onRetry }) => {
  const errorMessage = typeof error === "string" ? error : error.message;

  return (
    <div className="w-full">
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Connection Error</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Unable to connect to the server. Please check:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li>• Backend server is running</li>
              <li>• API URL is correct (check .env)</li>
              <li>• Internet connection is active</li>
              <li>• CORS is enabled on backend</li>
            </ul>
          </div>
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-mono break-words text-muted-foreground">{errorMessage}</p>
          </div>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
