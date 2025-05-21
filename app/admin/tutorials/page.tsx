"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tutorial } from "@/lib/types";
import { PageContainer } from "@/components/page-container";

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    fetch("http://localhost/mch-api/tutorials/")
      .then((res) => res.json())
      .then((data) => setTutorials(data))
      .catch((err) => console.error("Failed to load tutorials:", err));
  }, []);

  return (
    <PageContainer>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Manage Tutorials</h1>
        <Link href="/admin/tutorials/create">
          <Button className="bg-blue-700 text-white hover:bg-blue-800">
            + New Tutorial
          </Button>
        </Link>
      </div>

      {tutorials.length === 0 ? (
        <p className="text-muted-foreground">No tutorials available.</p>
      ) : (
        <ul className="space-y-4">
          {tutorials.map((tutorial) => (
            <li key={tutorial.id} className="border p-4 rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{tutorial.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {tutorial.description}
                  </p>
                </div>
                <Link href={`/admin/tutorials/${tutorial.id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
