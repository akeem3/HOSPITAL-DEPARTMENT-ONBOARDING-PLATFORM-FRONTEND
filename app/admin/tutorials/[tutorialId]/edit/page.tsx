"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Chapter, ContentItem, Tutorial } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChapterForm } from "@/components/admin/chapter-form";
import { ContentItemForm } from "@/components/admin/content-item-form";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default function EditTutorialPage() {
  const { tutorialId } = useParams();
  const router = useRouter();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost/mch-api/admin/tutorials/detail.php?id=${tutorialId}`
        );
        const data = await res.json();
        setTutorial(data);
        setChapters(data.chapters ?? []);
      } catch (err) {
        console.error("Failed to fetch tutorial details:", err);
        toast.error("Failed to load tutorial");
      }
    };

    fetchDetails();
  }, [tutorialId]);

  const handleChapterChange = (index: number, updated: Chapter) => {
    const updatedChapters = [...chapters];
    updatedChapters[index] = updated;
    setChapters(updatedChapters);
  };

  const handleContentItemChange = (
    chapterIndex: number,
    itemIndex: number,
    updated: ContentItem
  ) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].contentItems[itemIndex] = updated;
    setChapters(updatedChapters);
  };

  const addChapter = () => {
    setChapters([
      ...chapters,
      {
        id: Date.now(),
        title: "",
        description: "",
        order_num: chapters.length + 1,
        contentItems: [],
      },
    ]);
  };

  const deleteChapter = (index: number) => {
    const confirmed = confirm("Delete this chapter?");
    if (!confirmed) return;
    const updated = [...chapters];
    updated.splice(index, 1);
    setChapters(updated);
  };

  const addContentItem = (chapterIndex: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].contentItems.push({
      id: Date.now(),
      title: "",
      type: "text",
      content: "",
      description: "",
      duration: "",
      order_num: updatedChapters[chapterIndex].contentItems.length + 1,
    });
    setChapters(updatedChapters);
  };

  const deleteContentItem = (chapterIndex: number, itemIndex: number) => {
    const confirmed = confirm("Delete this content item?");
    if (!confirmed) return;
    const updatedChapters = [...chapters];
    updatedChapters[chapterIndex].contentItems.splice(itemIndex, 1);
    setChapters(updatedChapters);
  };

  const handleSave = async () => {
    if (!tutorial) return;

    const updatedTutorial = {
      ...tutorial,
      chapters, // Include updated chapters with contentItems
    };

    try {
      const res = await fetch(
        "http://localhost/mch-api/admin/tutorials/update.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTutorial), // Send the full tutorial data
        }
      );

      if (!res.ok) throw new Error("Failed to update tutorial");
      toast.success("Tutorial updated successfully");
      router.push("/admin/tutorials");
    } catch (err) {
      console.error(err);
      toast.error("Error saving tutorial");
    }
  };

  if (!tutorial) return <p className="p-4">Loading tutorial...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">
        Edit Tutorial: {tutorial.title}
      </h1>

      <div className="space-y-4 mb-6">
        <Input
          value={tutorial.title}
          onChange={(e) => setTutorial({ ...tutorial, title: e.target.value })}
          placeholder="Tutorial Title"
        />
        <Input
          value={tutorial.description}
          onChange={(e) =>
            setTutorial({ ...tutorial, description: e.target.value })
          }
          placeholder="Tutorial Description"
        />
        <Input
          value={tutorial.duration}
          onChange={(e) =>
            setTutorial({ ...tutorial, duration: e.target.value })
          }
          placeholder="Duration"
        />
        <Input
          value={tutorial.thumbnail}
          onChange={(e) =>
            setTutorial({ ...tutorial, thumbnail: e.target.value })
          }
          placeholder="Thumbnail (e.g. /images/doctor.jpg)"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chapters</h2>
        <Button variant="outline" onClick={addChapter}>
          + Add Chapter
        </Button>
      </div>

      {chapters.map((chapter, chapterIndex) => (
        <div
          key={chapter.id}
          className="border rounded-md p-4 mb-4 bg-gray-50 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Chapter {chapterIndex + 1}</h3>
            <Button
              variant="ghost"
              className="text-red-600"
              onClick={() => deleteChapter(chapterIndex)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          <ChapterForm
            chapter={chapter}
            onChange={(updated) => handleChapterChange(chapterIndex, updated)}
          />

          <div className="space-y-2">
            {chapter.contentItems.map((item, itemIndex) => (
              <div key={item.id} className="relative">
                <ContentItemForm
                  contentItem={item}
                  onChange={(updated) =>
                    handleContentItemChange(chapterIndex, itemIndex, updated)
                  }
                />
                <Button
                  variant="ghost"
                  className="text-red-600 mt-1"
                  onClick={() => deleteContentItem(chapterIndex, itemIndex)}
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Delete Item
                </Button>
              </div>
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

      <Button
        onClick={handleSave}
        className="mt-6 bg-blue-500 text-white hover:bg-blue-600"
      >
        Save Changes
      </Button>
    </div>
  );
}
