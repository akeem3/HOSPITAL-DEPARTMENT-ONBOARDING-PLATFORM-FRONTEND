import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TutorialCardProps {
  tutorial: {
    id: number | string;
    title: string;
    description: string;
    duration: string;
    image: string;
    status?: string;
    progress?: number;
  };
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-0 shadow-md swedish-card">
      <div className="aspect-video relative">
        <Image
          src={tutorial.image || "/placeholder.svg?height=200&width=300"}
          alt={tutorial.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {tutorial.status && (
          <div className="absolute right-2 top-2">
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
                  ? "bg-blue-700 hover:bg-blue-800"
                  : ""
              }
            >
              {tutorial.status}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-blue-700">
          {tutorial.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-gray-600">
          {tutorial.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{tutorial.duration}</span>
        </div>
        {tutorial.progress !== undefined && (
          <div className="mt-2">
            <div className="h-2 w-full rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-700"
                style={{ width: `${tutorial.progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-600">
              {tutorial.progress}% Complete
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link
          href={`/tutorials/${tutorial.id}`}
          className="w-full rounded-full bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-800 swedish-button"
        >
          {tutorial.progress ? "Continue" : "Start Learning"}
        </Link>
      </CardFooter>
    </Card>
  );
}
