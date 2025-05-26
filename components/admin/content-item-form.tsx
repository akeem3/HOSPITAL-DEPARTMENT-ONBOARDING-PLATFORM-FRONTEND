// components/admin/content-item-form.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface ContentItem {
  title: string;
  type: "video" | "document" | "text" | "file";
  content: string;
  description?: string;
  duration?: string;
  order_num: number;
}

interface ContentItemFormProps {
  contentItem: ContentItem;
  onChange: (updated: ContentItem) => void;
}

export function ContentItemForm({
  contentItem,
  onChange,
}: ContentItemFormProps) {
  return (
    <div className="border border-gray-300 p-4 rounded mb-4 space-y-4">
      <Input
        placeholder="Content Title"
        value={contentItem.title}
        onChange={(e) => onChange({ ...contentItem, title: e.target.value })}
      />

      <Select
        value={contentItem.type}
        onValueChange={(value) =>
          onChange({ ...contentItem, type: value as ContentItem["type"] })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="document">Document</SelectItem>
          <SelectItem value="text">Text</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Content URL or HTML"
        value={contentItem.content}
        onChange={(e) => onChange({ ...contentItem, content: e.target.value })}
      />

      <Textarea
        placeholder="Description"
        value={contentItem.description || ""}
        onChange={(e) =>
          onChange({ ...contentItem, description: e.target.value })
        }
      />

      <Input
        placeholder="Duration (e.g. 5 mins)"
        value={contentItem.duration || ""}
        onChange={(e) => onChange({ ...contentItem, duration: e.target.value })}
      />

      <Input
        placeholder="Order"
        type="number"
        value={contentItem.order_num}
        onChange={(e) =>
          onChange({ ...contentItem, order_num: Number(e.target.value) })
        }
      />
    </div>
  );
}
