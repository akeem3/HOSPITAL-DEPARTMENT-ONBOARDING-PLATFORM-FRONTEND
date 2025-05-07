import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Video, File } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import type { Chapter } from "@/lib/types";
import { TutorialStats } from "@/components/admin/tutorial-stats";

interface TutorialPreviewProps {
  tutorial: {
    id?: string;
    title: string;
    description: string;
    category?: string;
    status?: string;
    estimatedDuration?: string;
    coverImage?: string;
    videoUrl?: string;
    content: string;
    chapters?: Chapter[];
  };
}

export function TutorialPreview({ tutorial }: TutorialPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src={tutorial.coverImage || "/placeholder.svg?height=400&width=800"}
          alt={tutorial.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap gap-2">
              {tutorial.category && (
                <Badge className="bg-primary">{tutorial.category}</Badge>
              )}
              {tutorial.status && (
                <Badge
                  variant="outline"
                  className="bg-background text-foreground"
                >
                  {tutorial.status}
                </Badge>
              )}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
              {tutorial.title}
            </h1>
            <p className="mt-2 max-w-[700px] text-white/90">
              {tutorial.description}
            </p>
            {tutorial.estimatedDuration && (
              <p className="mt-4 text-sm text-white/70">
                Duration: {tutorial.estimatedDuration}
              </p>
            )}
          </div>
        </div>
      </div>

      {tutorial.chapters && tutorial.chapters.length > 0 && (
        <div className="my-6">
          <TutorialStats
            tutorial={{
              id: tutorial.id || "preview",
              title: tutorial.title,
              description: tutorial.description,
              thumbnail: tutorial.coverImage || "",
              chapters: tutorial.chapters,
              category: tutorial.category || "",
              status:
                (tutorial.status as "published" | "draft" | "archived") ||
                "draft",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              author: "Admin",
              duration: tutorial.estimatedDuration || "0 mins",
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {tutorial.videoUrl && (
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <VideoPlayer
                url={tutorial.videoUrl}
                title={tutorial.title}
                poster="/placeholder.svg?height=400&width=800"
              />
            </div>
          )}

          {tutorial.chapters && tutorial.chapters.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Tutorial Content
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {tutorial.chapters.map((chapter, index) => (
                  <AccordionItem
                    key={chapter.id}
                    value={chapter.id}
                    className="border-b border-gray-200"
                  >
                    <AccordionTrigger className="py-4 text-left font-medium text-gray-900 hover:text-blue-700">
                      {index + 1}. {chapter.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      {chapter.description && (
                        <p className="mb-3 text-sm text-gray-600">
                          {chapter.description}
                        </p>
                      )}
                      <div className="space-y-3">
                        {chapter.contentItems.length === 0 ? (
                          <p className="text-sm text-gray-500">
                            No content items in this chapter.
                          </p>
                        ) : (
                          chapter.contentItems.map((item, itemIndex) => (
                            <div
                              key={item.id}
                              className="rounded-md border border-gray-200 p-3"
                            >
                              <div className="flex items-center mb-2">
                                <div className="mr-2 text-gray-500">
                                  {item.type === "video" && (
                                    <Video className="h-4 w-4" />
                                  )}
                                  {item.type === "document" && (
                                    <File className="h-4 w-4" />
                                  )}
                                  {item.type === "text" && (
                                    <FileText className="h-4 w-4" />
                                  )}
                                </div>
                                <h4 className="font-medium text-gray-900">
                                  {itemIndex + 1}. {item.title}
                                </h4>
                              </div>
                              {item.description && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {item.description}
                                </p>
                              )}
                              {item.type === "text" && (
                                <div className="prose prose-sm max-w-none mt-2 border-t border-gray-100 pt-2">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: item.content,
                                    }}
                                  />
                                </div>
                              )}
                              {item.type === "video" && (
                                <div className="mt-2 border-t border-gray-100 pt-2">
                                  <p className="text-sm text-gray-600">
                                    Video URL: {item.content}
                                  </p>
                                </div>
                              )}
                              {item.type === "document" && (
                                <div className="mt-2 border-t border-gray-100 pt-2">
                                  <p className="text-sm text-gray-600">
                                    Document URL: {item.content}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-medium">Additional Resources</h3>
            <p className="text-sm text-muted-foreground">
              Resources will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
