"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Chapter, ContentItem, Tutorial } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChapterForm } from "@/components/admin/chapter-form";
import { ContentItemForm } from "@/components/admin/content-item-form";
import { toast } from "sonner";

export default function CreateTutorialPage() {
  const router = useRouter();

  const [tutorial, setTutorial] = useState<Omit<Tutorial, "id">>({
    title: "",
    description: "",
    thumbnail: "",
    category: "",
    duration: "",
    chapters: [],
  });

  const handleChapterChange = (index: number, updated: Chapter) => {
    const chapters = [...tutorial.chapters];
    chapters[index] = updated;
    setTutorial({ ...tutorial, chapters });
  };

  const addChapter = () => {
    setTutorial({
      ...tutorial,
      chapters: [
        ...tutorial.chapters,
        {
          id: Date.now(), // temporary unique ID
          title: "",
          description: "",
          order_num: tutorial.chapters.length + 1,
          contentItems: [],
        },
      ],
    });
  };

  const addContentItem = (chapterIndex: number) => {
    const chapters = [...tutorial.chapters];
    chapters[chapterIndex].contentItems.push({
      id: Date.now(),
      title: "",
      type: "text",
      content: "",
      description: "",
      duration: "",
      order_num: chapters[chapterIndex].contentItems.length + 1,
    });
    setTutorial({ ...tutorial, chapters });
  };

  const updateContentItem = (
    chapterIndex: number,
    itemIndex: number,
    updated: ContentItem
  ) => {
    const chapters = [...tutorial.chapters];
    chapters[chapterIndex].contentItems[itemIndex] = updated;
    setTutorial({ ...tutorial, chapters });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost/mch-api/tutorials/index.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tutorial),
        }
      );

      if (!response.ok) throw new Error("Failed to create tutorial");

      toast.success("Tutorial created successfully");
      router.push("/admin/tutorials");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create tutorial");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Tutorial</h1>

      <div className="grid gap-4">
        <Input
          placeholder="Title"
          value={tutorial.title}
          onChange={(e) => setTutorial({ ...tutorial, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={tutorial.description}
          onChange={(e) =>
            setTutorial({ ...tutorial, description: e.target.value })
          }
        />
        <Input
          placeholder="Thumbnail Path (e.g. /images/doctor.jpg)"
          value={tutorial.thumbnail}
          onChange={(e) =>
            setTutorial({ ...tutorial, thumbnail: e.target.value })
          }
        />
        <Input
          placeholder="Category"
          value={tutorial.category}
          onChange={(e) =>
            setTutorial({ ...tutorial, category: e.target.value })
          }
        />
        <Input
          placeholder="Duration (e.g. 30 mins)"
          value={tutorial.duration}
          onChange={(e) =>
            setTutorial({ ...tutorial, duration: e.target.value })
          }
        />
      </div>

      <div className="mt-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chapters</h2>
          <Button type="button" onClick={addChapter}>
            + Add Chapter
          </Button>
        </div>

        {tutorial.chapters.map((chapter, chapterIndex) => (
          <div key={chapter.id} className="border p-4 rounded-md space-y-4">
            <ChapterForm
              chapter={chapter}
              onChange={(updated: Chapter) =>
                handleChapterChange(chapterIndex, updated)
              }
            />

            <div className="space-y-2">
              <h3 className="font-medium">Content Items</h3>
              {chapter.contentItems.map((item, itemIndex) => (
                <ContentItemForm
                  key={item.id}
                  contentItem={item}
                  onChange={(updated) =>
                    updateContentItem(chapterIndex, itemIndex, updated)
                  }
                />
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addContentItem(chapterIndex)}
              >
                + Add Content Item
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button className="mt-6" onClick={handleSubmit}>
        Save Tutorial
      </Button>
    </div>
  );
}
