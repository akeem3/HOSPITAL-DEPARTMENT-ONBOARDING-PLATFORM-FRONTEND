import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, CheckCircle, BarChart } from "lucide-react";

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="admin-stat-card border-t-4 border-t-blue-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 admin-stat-header">
          <CardTitle className="text-sm font-medium text-gray-900">
            Total Tutorials
          </CardTitle>
          <BookOpen className="h-4 w-4 text-blue-700" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900 admin-stat-value">
            12
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-1 h-3 w-3 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                clipRule="evenodd"
              />
            </svg>
            <span>+2 from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-stat-card border-t-4 border-t-green-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 admin-stat-header">
          <CardTitle className="text-sm font-medium text-gray-900">
            Active Users
          </CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900 admin-stat-value">
            573
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-1 h-3 w-3 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                clipRule="evenodd"
              />
            </svg>
            <span>+201 from last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-stat-card border-t-4 border-t-purple-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 admin-stat-header">
          <CardTitle className="text-sm font-medium text-gray-900">
            Published Tutorials
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900 admin-stat-value">
            8
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-1 h-3 w-3 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                clipRule="evenodd"
              />
            </svg>
            <span>+1 from last week</span>
          </div>
        </CardContent>
      </Card>

      <Card className="admin-stat-card border-t-4 border-t-amber-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 admin-stat-header">
          <CardTitle className="text-sm font-medium text-gray-900">
            Average Rating
          </CardTitle>
          <BarChart className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900 admin-stat-value">
            4.2/5
          </div>
          <div className="mt-1 flex items-center text-xs text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="mr-1 h-3 w-3 text-green-600"
            >
              <path
                fillRule="evenodd"
                d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                clipRule="evenodd"
              />
            </svg>
            <span>+0.3 from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
