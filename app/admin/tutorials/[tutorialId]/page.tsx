"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Chapter, ContentItem, Tutorial } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChapterForm } from "@/components/admin/chapter-form";
import { ContentItemForm } from "@/components/admin/content-item-form";
import { toast } from "sonner";

export default function EditTutorialPage() {
  const { tutorialId } = useParams();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await fetch(
          `http://localhost/mch-api/tutorials/?id=${tutorialId}`
        );
        const data = await response.json();
        setTutorial(data);

        // If chapters are missing, provide fallback
        setChapters(data.chapters ?? []);
      } catch (error) {
        console.error("Failed to fetch tutorial:", error);
      }
    };

    fetchTutorial();
  }, [tutorialId]);

  const handleChapterChange = (index: number, updated: Chapter) => {
    const updatedChapters = [...chapters];
    updatedChapters[index] = updated;
    setChapters(updatedChapters);
  };

  const handleSave = async () => {
    if (!tutorial) return;

    const payload = {
      ...tutorial,
      chapters,
    };

    try {
      const response = await fetch(
        `http://localhost/mch-api/tutorials/update.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast.success("Tutorial updated successfully");
      } else {
        toast.error("Failed to update tutorial");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating");
    }
  };

  if (!tutorial) {
    return <p className="p-4">Loading tutorial...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Edit Tutorial: {tutorial.title}
      </h1>

      <Input
        className="mb-4"
        value={tutorial.title}
        onChange={(e) => setTutorial({ ...tutorial, title: e.target.value })}
        placeholder="Tutorial Title"
      />

      <Input
        className="mb-4"
        value={tutorial.description}
        onChange={(e) =>
          setTutorial({ ...tutorial, description: e.target.value })
        }
        placeholder="Tutorial Description"
      />

      <Input
        className="mb-4"
        value={tutorial.duration}
        onChange={(e) => setTutorial({ ...tutorial, duration: e.target.value })}
        placeholder="Duration (e.g., 45 mins)"
      />

      <Input
        className="mb-6"
        value={tutorial.thumbnail}
        onChange={(e) =>
          setTutorial({ ...tutorial, thumbnail: e.target.value })
        }
        placeholder="Thumbnail path (e.g., /images/doctor.png)"
      />

      {chapters.map((chapter, chapterIndex) => (
        <div
          key={chapter.id ?? chapterIndex}
          className="border p-4 mb-6 rounded-md bg-gray-50"
        >
          <ChapterForm
            chapter={{
              ...chapter,
              id:
                typeof chapter.id === "string"
                  ? parseInt(chapter.id)
                  : chapter.id,
              description: chapter.description ?? "",
            }}
            onChange={(updated) => handleChapterChange(chapterIndex, updated)}
          />

          <div className="mt-4">
            {chapter.contentItems.map((item, itemIndex) => (
              <ContentItemForm
                key={item.id || itemIndex}
                contentItem={item}
                onChange={(updated: ContentItem) => {
                  const updatedChapters = [...chapters];
                  updatedChapters[chapterIndex].contentItems[itemIndex] =
                    updated;
                  setChapters(updatedChapters);
                }}
              />
            ))}
          </div>
        </div>
      ))}

      <Button onClick={handleSave} className="mt-6">
        Save Changes
      </Button>
    </div>
  );
}
