"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Chapter } from "@/lib/types";

interface ChapterFormProps {
  initialData?: Chapter;
  onSave: (chapter: Partial<Chapter>) => void;
  onCancel: () => void;
}

export function ChapterForm({
  initialData,
  onSave,
  onCancel,
}: ChapterFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    onSave({
      title,
      description,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="chapter-title">Chapter Title</Label>
        <Input
          id="chapter-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter chapter title"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="chapter-description">Description (Optional)</Label>
        <Textarea
          id="chapter-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter chapter description"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          {initialData ? "Update" : "Add"} Chapter
        </Button>
      </div>
    </div>
  );
}
