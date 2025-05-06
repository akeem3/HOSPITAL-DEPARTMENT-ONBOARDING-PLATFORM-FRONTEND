"use client";

import { useState, useEffect } from "react";
import type { ContentItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentViewerProps {
  contentItem: ContentItem;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  onComplete?: () => void;
}

export function ContentViewer({
  contentItem,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
  onComplete,
}: ContentViewerProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      // Auto-mark as completed after viewing
      if (onComplete) {
        onComplete();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [contentItem.id, onComplete]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      );
    }

    switch (contentItem.type) {
      case "video":
        return (
          <div className="space-y-4">
            <VideoPlayer url={contentItem.content} title={contentItem.title} />
            {contentItem.description && (
              <p className="text-gray-700">{contentItem.description}</p>
            )}
          </div>
        );
      case "document":
        return (
          <div className="space-y-4">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden border">
              <iframe
                src={contentItem.content}
                className="w-full h-full"
                title={contentItem.title}
                allowFullScreen
              />
            </div>
            {contentItem.description && (
              <p className="text-gray-700">{contentItem.description}</p>
            )}
          </div>
        );
      case "text":
        return (
          <div className="prose max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: contentItem.content }} />
          </div>
        );
      default:
        return <p>Unsupported content type</p>;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          {contentItem.title}
        </h3>
        {renderContent()}

        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="border-gray-300 text-gray-900 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!hasNext}
            className="bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-50"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
