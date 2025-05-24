"use client";

import { useState, useEffect } from "react";
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
import type { Tutorial } from "@/lib/types";

export default function TutorialsPage() {
  const [allTutorials, setAllTutorials] = useState<Tutorial[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTutorials();
        setAllTutorials(data);
        setFilteredTutorials(data); // initial display
      } catch (error) {
        console.error("Failed to load the tutorials", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = allTutorials.filter(
      (tutorial) =>
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        );
        break;

      case "oldest":
        filtered = [...filtered].sort(
          (a, b) =>
            new Date(a.createdAt ?? 0).getTime() -
            new Date(b.createdAt ?? 0).getTime()
        );
        break;
      case "duration-asc":
        filtered = [...filtered].sort((a, b) => {
          const aMinutes = parseInt(a.duration);
          const bMinutes = parseInt(b.duration);
          return aMinutes - bMinutes;
        });
        break;
      case "duration-desc":
        filtered = [...filtered].sort((a, b) => {
          const aMinutes = parseInt(a.duration);
          const bMinutes = parseInt(b.duration);
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
          ALL DEPARTMENTS - جميع الأقسام
        </h1>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search tutorials..."
              className="max-w-md border-blue-300 focus-visible:ring-blue-500 text-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-[200px] ">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-blue-400 focus:ring-blue-500 ">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className=" bg-white border border-gray-200 shadow-md rounded-md py-2">
                <SelectItem
                  value="newest"
                  className="px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700 transition-colors cursor-pointer"
                >
                  Newest - الأحدث
                </SelectItem>
                <SelectItem
                  value="oldest"
                  className="px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700 transition-colors cursor-pointer"
                >
                  Oldest - الأقدم
                </SelectItem>
                <SelectItem
                  value="duration-asc"
                  className="px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700 transition-colors cursor-pointer"
                >
                  Shortest - الأقصر
                </SelectItem>
                <SelectItem
                  value="duration-desc"
                  className="px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-100 focus:text-blue-700 transition-colors cursor-pointer"
                >
                  Longest - الأطول
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
              }}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
