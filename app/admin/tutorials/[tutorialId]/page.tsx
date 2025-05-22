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
  //const router = useRouter();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const response = await fetch(
          `http://localhost/mch-api/admin/tutorials/?id=${tutorialId}`
        );
        const data = await response.json();
        setTutorial(data);
      } catch (error) {
        console.error("Failed to fetch tutorial:", error);
        toast.error("Failed to load tutorial data");
      }
    };

    fetchTutorial();
  }, [tutorialId]);

  const handleChapterChange = (index: number, updated: Chapter) => {
    if (!tutorial) return;
    const updatedChapters = [...tutorial.chapters];
    updatedChapters[index] = updated;
    setTutorial({ ...tutorial, chapters: updatedChapters });
  };

  const handleContentItemChange = (
    chapterIndex: number,
    itemIndex: number,
    updated: ContentItem
  ) => {
    if (!tutorial) return;
    const updatedChapters = [...tutorial.chapters];
    updatedChapters[chapterIndex].contentItems[itemIndex] = updated;
    setTutorial({ ...tutorial, chapters: updatedChapters });
  };

  const addChapter = () => {
    const existingChapters = tutorial?.chapters ?? [];
    const updatedChapters = [
      ...existingChapters,
      {
        id: Date.now(),
        title: "",
        description: "",
        order_num: existingChapters.length + 1,
        contentItems: [],
      },
    ];
    setTutorial({ ...tutorial, chapters: updatedChapters } as Tutorial);
  };

  const deleteChapter = (index: number) => {
    if (!tutorial) return;
    const updatedChapters = [...tutorial.chapters];
    updatedChapters.splice(index, 1);
    setTutorial({ ...tutorial, chapters: updatedChapters });
  };

  const addContentItem = (chapterIndex: number) => {
    if (!tutorial) return;
    const newItem: ContentItem = {
      id: Date.now(),
      title: "",
      type: "text",
      content: "",
      description: "",
      duration: "",
      order_num: tutorial.chapters[chapterIndex].contentItems.length + 1,
    };
    const updatedChapters = [...tutorial.chapters];
    updatedChapters[chapterIndex].contentItems.push(newItem);
    setTutorial({ ...tutorial, chapters: updatedChapters });
  };

  const deleteContentItem = (chapterIndex: number, itemIndex: number) => {
    if (!tutorial) return;
    const updatedChapters = [...tutorial.chapters];
    updatedChapters[chapterIndex].contentItems.splice(itemIndex, 1);
    setTutorial({ ...tutorial, chapters: updatedChapters });
  };

  const handleSave = async () => {
    if (!tutorial) return;

    try {
      const response = await fetch(
        `http://localhost/mch-api/admin/tutorials/update.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tutorial),
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

  if (!tutorial) return <p className="p-4">Loading tutorial...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">Edit Tutorial</h1>

      <Input
        placeholder="Title"
        value={tutorial.title}
        onChange={(e) => setTutorial({ ...tutorial, title: e.target.value })}
      />
      <Input
        placeholder="Description"
        value={tutorial.description}
        onChange={(e) =>
          setTutorial({ ...tutorial, description: e.target.value })
        }
      />
      <Input
        placeholder="Duration"
        value={tutorial.duration}
        onChange={(e) => setTutorial({ ...tutorial, duration: e.target.value })}
      />
      <Input
        placeholder="Thumbnail path (e.g., /images/doctor.jpg)"
        value={tutorial.thumbnail}
        onChange={(e) =>
          setTutorial({ ...tutorial, thumbnail: e.target.value })
        }
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chapters</h2>
          <Button type="button" onClick={addChapter}>
            + Add Chapter
          </Button>
        </div>

        {(tutorial.chapters ?? []).map((chapter, chapterIndex) => (
          <div key={chapter.id} className="border p-4 rounded-md space-y-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">Chapter {chapterIndex + 1}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteChapter(chapterIndex)}
              >
                Delete Chapter
              </Button>
            </div>

            <ChapterForm
              chapter={chapter}
              onChange={(updated) => handleChapterChange(chapterIndex, updated)}
            />

            <div className="space-y-2">
              <h4 className="font-medium">Content Items</h4>
              {chapter.contentItems.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className="border p-3 rounded bg-gray-50 relative"
                >
                  <ContentItemForm
                    contentItem={item}
                    onChange={(updated) =>
                      handleContentItemChange(chapterIndex, itemIndex, updated)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 absolute top-2 right-2"
                    onClick={() => deleteContentItem(chapterIndex, itemIndex)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addContentItem(chapterIndex)}
              >
                + Add Content Item
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="mt-6">
        Save Changes
      </Button>
    </div>
  );
}
