import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminStats } from "@/components/admin/admin-stats";
import { Button } from "@/components/ui/button";
import { PlusCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getTutorials } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const recentTutorials = getTutorials().slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-700">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-700">
            Manage tutorials, users, and monitor system performance
          </p>
        </div>
        <Link href="/admin/tutorials/create">
          <Button
            size="default"
            className="whitespace-nowrap bg-blue-700 hover:bg-blue-800 text-white swedish-button admin-button-primary"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Tutorial
          </Button>
        </Link>
      </div>

      <AdminStats />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="admin-card border-t-4 border-t-blue-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 border-b border-gray-200">
            <div>
              <CardTitle className="text-xl font-semibold text-blue-700">
                Recent Tutorials
              </CardTitle>
              <CardDescription className="mt-1 text-gray-700">
                Recently added or updated tutorials
              </CardDescription>
            </div>
            <Link href="/admin/tutorials">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-xs text-blue-700 hover:text-blue-800 hover:bg-blue-50"
              >
                View All
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentTutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="flex flex-col items-start gap-2 rounded-lg border border-gray-300 p-3 sm:flex-row sm:items-center hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium leading-none text-gray-900">
                        {tutorial.title}
                      </p>
                      <Badge
                        variant={
                          tutorial.status === "published"
                            ? "default"
                            : tutorial.status === "draft"
                            ? "outline"
                            : "secondary"
                        }
                        className={
                          tutorial.status === "published"
                            ? "bg-blue-700 hover:bg-blue-800 text-white"
                            : "border-blue-700 text-blue-700 bg-white"
                        }
                      >
                        {tutorial.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-700">
                      Last updated: {tutorial.lastUpdated || "N/A"}
                    </p>
                  </div>
                  <div className="flex w-full gap-2 sm:w-auto">
                    <Link
                      href={`/admin/tutorials/${tutorial.id}`}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto border-gray-300 text-gray-900 hover:border-blue-300 hover:text-blue-700"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Link
                      href={`/tutorials/${tutorial.id}`}
                      className="w-full sm:w-auto"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full sm:w-auto bg-gray-100 text-gray-900 hover:bg-gray-200"
                      >
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="admin-card border-t-4 border-t-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50 border-b border-gray-200">
            <div>
              <CardTitle className="text-xl font-semibold text-blue-700">
                Recent Feedback
              </CardTitle>
              <CardDescription className="mt-1 text-gray-700">
                Latest feedback from users
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-xs text-blue-700 hover:text-blue-800 hover:bg-blue-50"
            >
              View All
              <ExternalLink className="h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="rounded-lg border border-gray-300 p-3 shadow-sm hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-gray-900">Tutorial {id}</p>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < 6 - id ? "text-yellow-500" : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {6 - id}/5
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">
                    &#34;This tutorial was{" "}
                    {id === 1
                      ? "excellent"
                      : id === 2
                      ? "very helpful"
                      : "informative"}
                    .&#34;
                  </p>
                  <p className="mt-1 text-xs text-gray-700">
                    {id} day{id > 1 ? "s" : ""} ago
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="admin-card border-t-4 border-t-purple-600">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-blue-700">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 pt-6">
            <Link href="/admin/tutorials/create">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-300 text-gray-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Tutorial
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-300 text-gray-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Manage Admin Users
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start border-gray-300 text-gray-900 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Public Site
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
