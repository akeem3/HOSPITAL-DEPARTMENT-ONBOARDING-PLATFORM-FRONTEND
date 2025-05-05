"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple mock authentication
    // In a real app, this would validate against a database
    if (username === "admin" && password === "password") {
      // Set a simple session token in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="container-custom flex justify-between items-center mb-8">
        <Link href="/">
          <Button
            variant="ghost"
            className="flex items-center gap-2 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Website
          </Button>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        <Card className="w-full shadow-lg border-0">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center">
                <span className="text-white font-bold">MCH</span>
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold text-blue-700">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-gray-300 focus-visible:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus-visible:ring-blue-700"
                />
              </div>
              <div className="text-xs text-gray-600 p-2 bg-blue-50 rounded-md">
                <p>Default credentials:</p>
                <p>Username: admin</p>
                <p>Password: password</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white swedish-button"
              >
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
