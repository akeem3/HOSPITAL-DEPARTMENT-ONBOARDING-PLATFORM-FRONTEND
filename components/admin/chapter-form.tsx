import { Chapter } from "@/lib/types";

interface ChapterFormProps {
  chapter: Chapter;
  onChange: (updated: Chapter) => void;
}

export function ChapterForm({ chapter, onChange }: ChapterFormProps) {
  return (
    <div className="grid gap-2">
      <input
        value={chapter.title}
        onChange={(e) => onChange({ ...chapter, title: e.target.value })}
        placeholder="Chapter Title"
      />
      <textarea
        value={chapter.description}
        onChange={(e) => onChange({ ...chapter, description: e.target.value })}
        placeholder="Chapter Description"
      />
      <input
        type="number"
        value={chapter.order_num}
        onChange={(e) =>
          onChange({ ...chapter, order_num: parseInt(e.target.value) })
        }
        placeholder="Order"
      />
    </div>
  );
}
