import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, FileText, Clock } from "lucide-react";
import type { Tutorial } from "@/lib/types";

interface TutorialStatsProps {
  tutorial: Tutorial;
}

export function TutorialStats({ tutorial }: TutorialStatsProps) {
  // Calculate stats
  const totalChapters = tutorial.chapters.length;
  const totalContentItems = tutorial.chapters.reduce(
    (total, chapter) => total + chapter.contentItems.length,
    0
  );

  // Calculate estimated total duration
  const estimatedDuration = tutorial.duration || "N/A";

  // Calculate content type distribution
  const videoCount = tutorial.chapters.reduce(
    (count, chapter) =>
      count +
      chapter.contentItems.filter((item) => item.type === "video").length,
    0
  );

  const documentCount = tutorial.chapters.reduce(
    (count, chapter) =>
      count +
      chapter.contentItems.filter((item) => item.type === "document").length,
    0
  );

  const textCount = tutorial.chapters.reduce(
    (count, chapter) =>
      count +
      chapter.contentItems.filter((item) => item.type === "text").length,
    0
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="border-t-4 border-t-blue-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900">
            Chapters
          </CardTitle>
          <Layers className="h-4 w-4 text-blue-700" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900">
            {totalChapters}
          </div>
          <div className="mt-1 text-xs text-gray-700">
            {totalContentItems > 0 && (
              <span>
                ~{Math.round(totalContentItems / totalChapters)} items per
                chapter
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-green-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900">
            Content Items
          </CardTitle>
          <FileText className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900">
            {totalContentItems}
          </div>
          <div className="mt-1 text-xs text-gray-700">
            <span>
              {videoCount} videos, {documentCount} docs, {textCount} text
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-purple-600">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-900">
            Duration
          </CardTitle>
          <Clock className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold text-gray-900">
            {estimatedDuration}
          </div>
          <div className="mt-1 text-xs text-gray-700">
            <span>Estimated completion time</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
