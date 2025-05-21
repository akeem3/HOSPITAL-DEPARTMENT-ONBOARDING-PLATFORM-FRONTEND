// components/admin/tutorial-preview.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Tutorial {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="relative aspect-video">
        <Image
          src={tutorial.thumbnail || "/placeholder.svg?height=200&width=300"}
          alt={tutorial.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-blue-700 line-clamp-1">
          {tutorial.title}
        </CardTitle>
        <p className="text-gray-600 text-sm line-clamp-2">
          {tutorial.description}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span>{tutorial.duration}</span>
          <span>{tutorial.category}</span>
        </div>
        <Link href={`/admin/tutorials/${tutorial.id}`}>
          <Button className="w-full">Edit</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
