"use client";

import { useState } from "react";
import type { Chapter } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, File, FileText, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterAccordionProps {
  chapters: Chapter[];
  activeChapterId?: string;
  activeContentItemId?: string;
  completedItems?: string[];
  onSelectContentItem: (chapterId: string, contentItemId: string) => void;
}

export function ChapterAccordion({
  chapters,
  activeChapterId,
  activeContentItemId,
  completedItems = [],
  onSelectContentItem,
}: ChapterAccordionProps) {
  // Normalize chapter IDs to strings for Accordion compatibility
  const normalizeId = (id: string | number | undefined) =>
    id !== undefined ? String(id) : "";

  const [openChapters, setOpenChapters] = useState<string[]>(
    activeChapterId
      ? [normalizeId(activeChapterId)]
      : chapters.length > 0
      ? [normalizeId(chapters[0].id)]
      : []
  );

  const handleChapterToggle = (chapterId: string | number | undefined) => {
    const id = normalizeId(chapterId);
    setOpenChapters((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <File className="h-4 w-4" />;
      case "text":
        return <FileText className="h-4 w-4" />;
      case "file":
        return <File className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Accordion
      type="multiple"
      value={openChapters}
      onValueChange={(values) => setOpenChapters(values as string[])}
      className="w-full"
    >
      {chapters.map((chapter) => {
        const chapterId = normalizeId(chapter.id);
        return (
          <AccordionItem
            key={chapterId}
            value={chapterId}
            className="border-b border-gray-200"
          >
            <AccordionTrigger
              onClick={() => handleChapterToggle(chapter.id)}
              className="py-4 text-left font-medium text-gray-900 hover:text-blue-700"
            >
              {chapter.title}
            </AccordionTrigger>
            <AccordionContent>
              {chapter.description && (
                <p className="mb-3 text-sm text-gray-600">
                  {chapter.description}
                </p>
              )}
              <div className="space-y-1 py-1">
                {chapter.contentItems
                  .sort((a, b) => a.order_num - b.order_num)
                  .map((item) => {
                    const itemId = normalizeId(item.id);
                    return (
                      <Button
                        key={itemId}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          activeContentItemId === itemId
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                        )}
                        onClick={() => onSelectContentItem(chapterId, itemId)}
                      >
                        <div className="mr-2 text-gray-500">
                          {getContentIcon(item.type)}
                        </div>
                        <span className="flex-1 truncate">{item.title}</span>
                        <div className="ml-2">
                          {completedItems.includes(itemId) ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300" />
                          )}
                        </div>
                      </Button>
                    );
                  })}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
