import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sprout className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">GreenBiz Wholesale Manager</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter your password" type="password" />
          </div>
          <Button className="w-full" size="lg">
            Login
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Admin access only. Contact support for assistance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
