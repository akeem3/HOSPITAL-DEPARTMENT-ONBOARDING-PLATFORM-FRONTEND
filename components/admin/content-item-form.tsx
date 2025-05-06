"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Video, File } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { ContentItem } from "@/lib/types";

interface ContentItemFormProps {
  initialData?: ContentItem;
  onSave: (contentItem: Partial<ContentItem>) => void;
  onCancel: () => void;
}

export function ContentItemForm({
  initialData,
  onSave,
  onCancel,
}: ContentItemFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState<"video" | "document" | "text">(
    initialData?.type || "text"
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [url, setUrl] = useState(
    initialData?.type !== "text" ? initialData?.content || "" : ""
  );
  const [textContent, setTextContent] = useState(
    initialData?.type === "text" ? initialData?.content || "" : ""
  );

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const content = type === "text" ? textContent : url;

    if (!content) {
      alert(`${type === "text" ? "Content" : "URL"} is required`);
      return;
    }

    onSave({
      title,
      type,
      description,
      content,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter content title"
        />
      </div>

      <div className="grid gap-2">
        <Label>Content Type</Label>
        <RadioGroup
          value={type}
          onValueChange={(value) =>
            setType(value as "video" | "document" | "text")
          }
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="video" id="video" />
            <Label htmlFor="video" className="flex items-center">
              <Video className="mr-2 h-4 w-4" />
              Video
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="document" id="document" />
            <Label htmlFor="document" className="flex items-center">
              <File className="mr-2 h-4 w-4" />
              Document
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Text
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="content-description">Description (Optional)</Label>
        <Textarea
          id="content-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter content description"
          rows={2}
        />
      </div>

      {type === "text" ? (
        <div className="grid gap-2">
          <Label htmlFor="content-text">Content</Label>
          <RichTextEditor
            initialValue={textContent}
            onChange={setTextContent}
            minHeight="200px"
          />
        </div>
      ) : (
        <div className="grid gap-2">
          <Label htmlFor="content-url">
            {type === "video" ? "Video URL" : "Document URL"}
          </Label>
          <Input
            id="content-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={
              type === "video"
                ? "Enter video URL (YouTube or direct link)"
                : "Enter document URL"
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          {initialData ? "Update" : "Add"} Content
        </Button>
      </div>
    </div>
  );
}
