import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TutorialPreviewProps {
  tutorial: {
    title: string;
    description: string;
    category?: string;
    status?: string;
    estimatedDuration?: string;
    coverImage?: string;
    videoUrl?: string;
    content: string;
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {tutorial.videoUrl && (
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <video
                src={tutorial.videoUrl}
                controls
                className="h-full w-full"
                poster="/placeholder.svg?height=400&width=800"
              >
                Your browser does not support the video tag.
              </video>
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
