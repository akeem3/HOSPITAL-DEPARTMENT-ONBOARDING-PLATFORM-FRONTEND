"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { getTutorialById } from "@/lib/data";

export default function EditTutorialPage({
  params,
}: {
  params: { tutorialId: string };
}) {
  const router = useRouter();
  const tutorialId = params.tutorialId;
  const initialTutorial = getTutorialById(tutorialId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialTutorial) {
      setTitle(initialTutorial.title);
      setDescription(initialTutorial.description);
      setVideoUrl(initialTutorial.videoUrl);
      setContent(initialTutorial.content);
    }
  }, [initialTutorial]);

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving tutorial:", {
      id: tutorialId,
      title,
      description,
      videoUrl,
      content,
    });

    // Navigate back to tutorials list
    router.push("/admin/tutorials");
  };

  if (!initialTutorial) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Tutorial Not Found
          </h1>
          <Button onClick={() => router.push("/admin/tutorials")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tutorials
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Edit Tutorial
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/tutorials")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">Video URL (Firebase Storage)</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://firebasestorage.example.com/videos/tutorial.mp4"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <RichTextEditor initialValue={content} onChange={setContent} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Preview</h2>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              {title}
            </h3>
            <p className="text-muted-foreground mb-4">{description}</p>

            {videoUrl && (
              <div className="mb-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <video src={videoUrl} controls className="w-full h-full">
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            <div
              className="prose max-w-none text-gray-900"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
