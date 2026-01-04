import { Label } from "@radix-ui/react-label";
import { JSX } from "react";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

const LoginPage = (): JSX.Element => (
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[oklch(0.18_0.04_265)] to-[oklch(0.14_0.03_265)] p-4">
    <div className="w-full max-w-md">
      {/* Logo/Brand */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-accent mb-4 text-4xl shadow-lg shadow-primary/20">
          🧄
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
          Garlic & Green Peas
        </h1>
        <p className="text-muted-foreground">Admin Panel Login</p>
      </div>

      {/* Login Card */}
      <Card className="border-border/50 shadow-2xl shadow-black/20 backdrop-blur-sm bg-card/95">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                className="h-11 bg-input border-border/50 focus:border-primary transition-colors"
                id="email"
                placeholder="admin@example.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  className="text-xs text-primary hover:underline hover:text-primary/80 transition-colors"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
              <Input
                className="h-11 bg-input border-border/50 focus:border-primary transition-colors"
                id="password"
                placeholder="••••••••"
                type="password"
              />
            </div>
            <Button
              className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        <svg
          className="w-4 h-4 inline-block mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
        Protected by enterprise-grade security
      </p>
    </div>
  </div>
);

export default LoginPage;
