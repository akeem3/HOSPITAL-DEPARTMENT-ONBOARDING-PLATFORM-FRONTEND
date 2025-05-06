"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileText } from "lucide-react";
import type { ContentItem } from "@/lib/types";

interface BulkContentImportProps {
  onImport: (contentItems: Partial<ContentItem>[]) => void;
  onCancel: () => void;
}

export function BulkContentImport({
  onImport,
  onCancel,
}: BulkContentImportProps) {
  const [bulkContent, setBulkContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleImport = () => {
    try {
      // Split by double newlines to get each content item
      const contentItems = bulkContent
        .split("\n\n")
        .filter((item) => item.trim())
        .map((item, index) => {
          const lines = item.split("\n").filter((line) => line.trim());

          if (lines.length < 1) {
            throw new Error(`Item #${index + 1} is missing a title`);
          }

          const title = lines[0].trim();
          const description = lines.length > 1 ? lines[1].trim() : "";
          const content =
            lines.length > 2 ? lines.slice(2).join("\n").trim() : "";

          return {
            title,
            description,
            type: "text" as const,
            content: `<p>${content.replace(/\n/g, "</p><p>")}</p>`,
            order: index + 1,
          };
        });

      if (contentItems.length === 0) {
        setError("No valid content items found");
        return;
      }

      onImport(contentItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid format");
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="bulk-content">Bulk Content Import</Label>
          <span className="text-xs text-gray-500">
            Separate items with double newlines
          </span>
        </div>
        <Textarea
          id="bulk-content"
          value={bulkContent}
          onChange={(e) => setBulkContent(e.target.value)}
          placeholder={`Title 1\nDescription for item 1\nContent for item 1\n\nTitle 2\nDescription for item 2\nContent for item 2`}
          rows={12}
          className="font-mono text-sm"
        />
      </div>

      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <FileText className="h-5 w-5 text-blue-700" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-700">
              Format Instructions
            </h3>
            <div className="mt-2 text-sm text-blue-600">
              <ul className="list-disc space-y-1 pl-5">
                <li>First line: Title (required)</li>
                <li>Second line: Description (optional)</li>
                <li>Remaining lines: Content (optional)</li>
                <li>Separate each item with a blank line</li>
                <li>All items will be imported as text content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleImport}
          className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          Import Content
        </Button>
      </div>
    </div>
  );
}
