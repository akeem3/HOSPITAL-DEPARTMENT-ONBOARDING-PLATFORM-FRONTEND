"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getTutorials } from "@/lib/data";

export default function TutorialsPage() {
  const allTutorials = getTutorials();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter tutorials based on search query and status
  const filteredTutorials = allTutorials.filter((tutorial) => {
    const matchesSearch = tutorial.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tutorial.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Paginate tutorials
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTutorials = filteredTutorials
    .slice(indexOfFirstItem, indexOfLastItem)
    .map((tutorial) => {
      return {
        ...tutorial,
        chaptersCount: tutorial.chapters.length,
        contentItemsCount: tutorial.chapters.reduce(
          (total, chapter) => total + chapter.contentItems.length,
          0
        ),
      };
    });
  const totalPages = Math.ceil(filteredTutorials.length / itemsPerPage);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-700">Tutorials</h1>
        <Link href="/admin/tutorials/create">
          <Button className="bg-blue-700 hover:bg-blue-800 text-white swedish-button admin-button-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Tutorial
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm border-gray-300 focus-visible:ring-blue-700 text-gray-900"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-gray-300 focus:ring-blue-700 text-gray-900 bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border border-gray-300 shadow-sm admin-table">
        <Table>
          <TableHeader className="bg-gray-100 admin-table-header">
            <TableRow>
              <TableHead className="text-gray-900 font-medium">Title</TableHead>
              <TableHead className="text-gray-900 font-medium">
                Status
              </TableHead>
              <TableHead className="text-gray-900 font-medium">
                Chapters
              </TableHead>
              <TableHead className="text-gray-900 font-medium">
                Last Updated
              </TableHead>
              <TableHead className="text-gray-900 font-medium">
                Author
              </TableHead>
              <TableHead className="w-[80px] text-gray-900 font-medium">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTutorials.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-700"
                >
                  No tutorials found. Try adjusting your search or filter.
                </TableCell>
              </TableRow>
            ) : (
              currentTutorials.map((tutorial) => (
                <TableRow
                  key={tutorial.id}
                  className="border-b border-gray-200 hover:bg-blue-50 admin-table-row"
                >
                  <TableCell className="font-medium text-gray-900">
                    {tutorial.title}
                  </TableCell>
                  <TableCell>
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
                          ? "bg-blue-700 hover:bg-blue-800 text-white admin-badge-primary"
                          : tutorial.status === "draft"
                          ? "border-blue-700 text-blue-700 bg-white admin-badge-outline"
                          : "bg-gray-100 text-gray-800 admin-badge-secondary"
                      }
                    >
                      {tutorial.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-900">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <Layers className="h-4 w-4 text-gray-500" />
                        <span>{tutorial.chaptersCount}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {tutorial.contentItemsCount} content items
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {tutorial.updatedAt}
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {tutorial.author}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-white border border-gray-300"
                      >
                        <DropdownMenuLabel className="text-gray-900">
                          Actions
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <Link href={`/admin/tutorials/${tutorial.id}`}>
                          <DropdownMenuItem className="text-gray-900 hover:text-blue-700 hover:bg-blue-50 cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/tutorials/${tutorial.id}`}>
                          <DropdownMenuItem className="text-gray-900 hover:text-blue-700 hover:bg-blue-50 cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-gray-300 text-gray-900 hover:border-blue-300 hover:text-blue-700 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-900">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="border-gray-300 text-gray-900 hover:border-blue-300 hover:text-blue-700 disabled:bg-gray-100 disabled:text-gray-400"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
