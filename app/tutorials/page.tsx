"use client";

import { TutorialCard } from "@/components/tutorial-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTutorials } from "@/lib/data";
import { PageContainer } from "@/components/page-container";
import { useState, useEffect } from "react";

export default function TutorialsPage() {
  const allTutorials = getTutorials();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredTutorials, setFilteredTutorials] = useState(allTutorials);

  useEffect(() => {
    // Filter tutorials based on search query
    let filtered = allTutorials.filter(
      (tutorial) =>
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort tutorials based on selected option
    switch (sortBy) {
      case "newest":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "duration-asc":
        filtered = [...filtered].sort((a, b) => {
          const aMinutes = Number.parseInt(a.duration.split(" ")[0]);
          const bMinutes = Number.parseInt(b.duration.split(" ")[0]);
          return aMinutes - bMinutes;
        });
        break;
      case "duration-desc":
        filtered = [...filtered].sort((a, b) => {
          const aMinutes = Number.parseInt(a.duration.split(" ")[0]);
          const bMinutes = Number.parseInt(b.duration.split(" ")[0]);
          return bMinutes - aMinutes;
        });
        break;
      default:
        break;
    }

    setFilteredTutorials(filtered);
  }, [searchQuery, sortBy, allTutorials]);

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
          All Tutorials
        </h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search tutorials..."
              className="max-w-md border-blue-200 focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-blue-200 focus:ring-blue-500">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="duration-asc">
                  Duration (Shortest)
                </SelectItem>
                <SelectItem value="duration-desc">
                  Duration (Longest)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredTutorials.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No tutorials found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={{
                id: tutorial.id,
                title: tutorial.title,
                description: tutorial.description,
                duration: tutorial.duration,
                image: tutorial.thumbnail,
                status: tutorial.status,
              }}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
