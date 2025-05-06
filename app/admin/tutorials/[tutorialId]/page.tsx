"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  FileText,
  Video,
  File,
  MoveUp,
  MoveDown,
} from "lucide-react";
import { getTutorialById } from "@/lib/data";
import type { Chapter, ContentItem } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TutorialPreview } from "@/components/admin/tutorial-preview";
import { ChapterForm } from "@/components/admin/chapter-form";
import { ContentItemForm } from "@/components/admin/content-item-form";
import { TutorialStats } from "@/components/admin/tutorial-stats";

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
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeTab, setActiveTab] = useState("details");

  const [isAddChapterDialogOpen, setIsAddChapterDialogOpen] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterDescription, setNewChapterDescription] = useState("");

  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [newContentTitle, setNewContentTitle] = useState("");
  const [newContentType, setNewContentType] = useState<
    "video" | "document" | "text"
  >("text");
  const [newContentUrl, setNewContentUrl] = useState("");
  const [newContentDescription, setNewContentDescription] = useState("");
  const [newContentText, setNewContentText] = useState("");

  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState("");

  useEffect(() => {
    if (initialTutorial) {
      setTitle(initialTutorial.title);
      setDescription(initialTutorial.description);
      setCategory(initialTutorial.category);
      setStatus(initialTutorial.status);
      setEstimatedDuration(initialTutorial.duration);
      setCoverImage(initialTutorial.thumbnail);
      setChapters(initialTutorial.chapters);

      // Expand all chapters by default
      setExpandedChapters(
        initialTutorial.chapters.map((chapter) => chapter.id)
      );
    }
  }, [initialTutorial]);

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving tutorial:", {
      id: tutorialId,
      title,
      description,
      category,
      status,
      duration: estimatedDuration,
      thumbnail: coverImage,
      chapters,
    });

    // Navigate back to tutorials list
    router.push("/admin/tutorials");
  };

  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) return;

    const newChapter: Chapter = {
      id: `new-${Date.now()}`,
      title: newChapterTitle,
      description: newChapterDescription,
      contentItems: [],
      order: chapters.length + 1,
    };

    setChapters([...chapters, newChapter]);
    setExpandedChapters([...expandedChapters, newChapter.id]);
    setNewChapterTitle("");
    setNewChapterDescription("");
    setIsAddChapterDialogOpen(false);
  };

  const handleDeleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    setExpandedChapters(expandedChapters.filter((id) => id !== chapterId));
  };

  const handleAddContent = () => {
    if (!activeChapterId || !newContentTitle.trim()) return;

    const newContent: ContentItem = {
      id: `new-content-${Date.now()}`,
      title: newContentTitle,
      type: newContentType,
      content: newContentType === "text" ? newContentText : newContentUrl,
      description: newContentDescription,
      order:
        chapters.find((c) => c.id === activeChapterId)?.contentItems.length ||
        0 + 1,
    };

    setChapters(
      chapters.map((chapter) =>
        chapter.id === activeChapterId
          ? { ...chapter, contentItems: [...chapter.contentItems, newContent] }
          : chapter
      )
    );

    // Reset form
    setNewContentTitle("");
    setNewContentType("text");
    setNewContentUrl("");
    setNewContentDescription("");
    setNewContentText("");
    setIsAddContentDialogOpen(false);
  };

  const handleDeleteContent = (chapterId: string, contentId: string) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              contentItems: chapter.contentItems.filter(
                (item) => item.id !== contentId
              ),
            }
          : chapter
      )
    );
  };

  const moveChapter = (chapterId: string, direction: "up" | "down") => {
    const chapterIndex = chapters.findIndex(
      (chapter) => chapter.id === chapterId
    );
    if (
      (direction === "up" && chapterIndex === 0) ||
      (direction === "down" && chapterIndex === chapters.length - 1)
    ) {
      return;
    }

    const newChapters = [...chapters];
    const targetIndex =
      direction === "up" ? chapterIndex - 1 : chapterIndex + 1;
    const temp = newChapters[targetIndex];
    newChapters[targetIndex] = {
      ...newChapters[chapterIndex],
      order: targetIndex + 1,
    };
    newChapters[chapterIndex] = { ...temp, order: chapterIndex + 1 };
    setChapters(newChapters);
  };

  const moveContentItem = (
    chapterId: string,
    contentId: string,
    direction: "up" | "down"
  ) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    if (!chapter) return;

    const contentIndex = chapter.contentItems.findIndex(
      (item) => item.id === contentId
    );
    if (
      (direction === "up" && contentIndex === 0) ||
      (direction === "down" && contentIndex === chapter.contentItems.length - 1)
    ) {
      return;
    }

    const newContentItems = [...chapter.contentItems];
    const targetIndex =
      direction === "up" ? contentIndex - 1 : contentIndex + 1;
    const temp = newContentItems[targetIndex];
    newContentItems[targetIndex] = {
      ...newContentItems[contentIndex],
      order: targetIndex + 1,
    };
    newContentItems[contentIndex] = { ...temp, order: contentIndex + 1 };

    setChapters(
      chapters.map((c) =>
        c.id === chapterId ? { ...c, contentItems: newContentItems } : c
      )
    );
  };

  const openAddContentDialog = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setIsAddContentDialogOpen(true);
  };

  const handleAccordionChange = (value: string[]) => {
    setExpandedChapters(value);
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
          <Button
            onClick={handleSave}
            className="bg-blue-700 hover:bg-blue-800 text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      {initialTutorial && (
        <div className="mb-6">
          <TutorialStats tutorial={initialTutorial} />
        </div>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Tutorial Details</TabsTrigger>
          <TabsTrigger value="chapters">Chapters & Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
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

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orientation">Orientation</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                        <SelectItem value="er">Emergency Room</SelectItem>
                        <SelectItem value="or">Operating Room</SelectItem>
                        <SelectItem value="infection-control">
                          Infection Control
                        </SelectItem>
                        <SelectItem value="patient-management">
                          Patient Management
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration">
                      Estimated Duration
                    </Label>
                    <Input
                      id="estimatedDuration"
                      value={estimatedDuration}
                      onChange={(e) => setEstimatedDuration(e.target.value)}
                      placeholder="e.g., 45 mins"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chapters" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Chapters
                </h2>
                <Dialog
                  open={isAddChapterDialogOpen}
                  onOpenChange={setIsAddChapterDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Chapter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Chapter</DialogTitle>
                      <DialogDescription>
                        Create a new chapter for this tutorial.
                      </DialogDescription>
                    </DialogHeader>
                    <ChapterForm
                      onSave={(chapterData) => {
                        const newChapter: Chapter = {
                          id: `new-${Date.now()}`,
                          title: chapterData.title || "",
                          description: chapterData.description,
                          contentItems: [],
                          order: chapters.length + 1,
                        };

                        setChapters([...chapters, newChapter]);
                        setExpandedChapters([
                          ...expandedChapters,
                          newChapter.id,
                        ]);
                        setIsAddChapterDialogOpen(false);
                      }}
                      onCancel={() => setIsAddChapterDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              {chapters.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-blue-100 p-3 text-blue-700">
                    <Plus className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No chapters yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by adding a chapter to your tutorial.
                  </p>
                  <Button
                    onClick={() => setIsAddChapterDialogOpen(true)}
                    className="mt-4 bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Chapter
                  </Button>
                </div>
              ) : (
                <Accordion
                  type="multiple"
                  value={expandedChapters}
                  onValueChange={handleAccordionChange}
                  className="w-full"
                >
                  {chapters.map((chapter, index) => (
                    <AccordionItem
                      key={chapter.id}
                      value={chapter.id}
                      className="border-b border-gray-200"
                    >
                      <div className="flex items-center justify-between">
                        <AccordionTrigger className="py-4 text-left font-medium text-gray-900 hover:text-blue-700 flex-1">
                          {index + 1}. {chapter.title}
                        </AccordionTrigger>
                        <div className="flex items-center mr-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveChapter(chapter.id, "up");
                            }}
                            disabled={index === 0}
                            className="text-gray-500 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveChapter(chapter.id, "down");
                            }}
                            disabled={index === chapters.length - 1}
                            className="text-gray-500 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChapter(chapter.id);
                            }}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <AccordionContent>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700">
                            Content Items
                          </h4>
                          <div className="mt-2 space-y-2">
                            {chapter.contentItems.length === 0 ? (
                              <p className="text-sm text-gray-500">
                                No content items yet.
                              </p>
                            ) : (
                              chapter.contentItems.map((item, itemIndex) => (
                                <div
                                  key={item.id}
                                  className="flex items-center justify-between rounded-md border border-gray-200 p-3"
                                >
                                  <div className="flex items-center">
                                    <div className="mr-3 text-gray-500">
                                      {item.type === "video" && (
                                        <Video className="h-4 w-4" />
                                      )}
                                      {item.type === "document" && (
                                        <File className="h-4 w-4" />
                                      )}
                                      {item.type === "text" && (
                                        <FileText className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        {itemIndex + 1}. {item.title}
                                      </p>
                                      {item.description && (
                                        <p className="text-xs text-gray-500">
                                          {item.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        moveContentItem(
                                          chapter.id,
                                          item.id,
                                          "up"
                                        )
                                      }
                                      disabled={itemIndex === 0}
                                      className="text-gray-500 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                      <MoveUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        moveContentItem(
                                          chapter.id,
                                          item.id,
                                          "down"
                                        )
                                      }
                                      disabled={
                                        itemIndex ===
                                        chapter.contentItems.length - 1
                                      }
                                      className="text-gray-500 hover:text-blue-700 hover:bg-blue-50"
                                    >
                                      <MoveDown className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() =>
                                        handleDeleteContent(chapter.id, item.id)
                                      }
                                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          <Button
                            onClick={() => openAddContentDialog(chapter.id)}
                            className="mt-3 bg-blue-700 hover:bg-blue-800 text-white"
                            size="sm"
                          >
                            <Plus className="mr-2 h-3 w-3" />
                            Add Content Item
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              {/* Add Content Dialog */}
              <Dialog
                open={isAddContentDialogOpen}
                onOpenChange={setIsAddContentDialogOpen}
              >
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Content Item</DialogTitle>
                    <DialogDescription>
                      Add a new content item to this chapter.
                    </DialogDescription>
                  </DialogHeader>
                  <ContentItemForm
                    onSave={(contentData) => {
                      if (!activeChapterId || !contentData.title) return;

                      const newContent: ContentItem = {
                        id: `new-content-${Date.now()}`,
                        title: contentData.title,
                        type: contentData.type as "video" | "document" | "text",
                        content: contentData.content || "",
                        description: contentData.description,
                        order:
                          chapters.find((c) => c.id === activeChapterId)
                            ?.contentItems.length || 0 + 1,
                      };

                      setChapters(
                        chapters.map((chapter) =>
                          chapter.id === activeChapterId
                            ? {
                                ...chapter,
                                contentItems: [
                                  ...chapter.contentItems,
                                  newContent,
                                ],
                              }
                            : chapter
                        )
                      );

                      setIsAddContentDialogOpen(false);
                    }}
                    onCancel={() => setIsAddContentDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              {chapters.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500">
                    Add chapters and content to preview your tutorial.
                  </p>
                </div>
              ) : (
                <TutorialPreview
                  tutorial={{
                    title: title || "Tutorial Title",
                    description:
                      description || "Tutorial description will appear here.",
                    category: category,
                    status: status,
                    estimatedDuration: estimatedDuration,
                    coverImage: coverImage,
                    content: previewContent,
                    chapters: chapters,
                  }}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
