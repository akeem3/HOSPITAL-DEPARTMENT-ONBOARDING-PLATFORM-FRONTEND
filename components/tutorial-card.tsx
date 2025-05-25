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

interface TutorialCardProps {
  tutorial: {
    id: number | string;
    title: string;
    description: string;
    duration: string;
    image: string;
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
          className="object-cover transition-transform hover:scale-105 rounded-t-lg"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-blue-500 pb-0.5">
          {tutorial.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-gray-600">
          {tutorial.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-green-600">
          <span>{tutorial.duration}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Link
          href={`/tutorials/${tutorial.id}`}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-600 swedish-button"
        >
          View - منظر
        </Link>
      </CardFooter>
    </Card>
  );
}
