"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { TutorialPreview } from "@/components/admin/tutorial-preview";
import { ChapterForm } from "@/components/admin/chapter-form";
import { ContentItemForm } from "@/components/admin/content-item-form";
import { BulkContentImport } from "@/components/admin/bulk-content-import";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  estimatedDuration: z.string().min(1, {
    message: "Please provide an estimated duration.",
  }),
  coverImage: z.string().optional(),
});

export default function CreateTutorialPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isAddChapterDialogOpen, setIsAddChapterDialogOpen] = useState(false);
  const [isAddContentDialogOpen, setIsAddContentDialogOpen] = useState(false);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState("");
  const [isBulkImportDialogOpen, setIsBulkImportDialogOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status: "draft",
      estimatedDuration: "",
      coverImage: "/placeholder.svg?height=400&width=800",
    },
  });

  const handleAddChapter = (chapterData: Partial<Chapter>) => {
    if (!chapterData.title?.trim()) {
      setFormError("Chapter title is required");
      return;
    }

    const newChapter: Chapter = {
      id: `new-${Date.now()}`,
      title: chapterData.title,
      description: chapterData.description,
      contentItems: [],
      order: chapters.length + 1,
    };

    setChapters([...chapters, newChapter]);
    setExpandedChapters([...expandedChapters, newChapter.id]);
    setIsAddChapterDialogOpen(false);
    setFormError(null);
  };

  const handleDeleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter.id !== chapterId));
    setExpandedChapters(expandedChapters.filter((id) => id !== chapterId));
  };

  const handleAddContent = (contentData: Partial<ContentItem>) => {
    if (!activeChapterId || !contentData.title?.trim()) {
      setFormError("Content title is required");
      return;
    }

    const newContent: ContentItem = {
      id: `new-content-${Date.now()}`,
      title: contentData.title,
      type: contentData.type as "video" | "document" | "text",
      content: contentData.content || "",
      description: contentData.description,
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

    setIsAddContentDialogOpen(false);
    setFormError(null);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // In a real app, you would submit the form data to your backend
      const tutorialData = {
        ...values,
        chapters: chapters.map((chapter, index) => ({
          ...chapter,
          order: index + 1,
          contentItems: chapter.contentItems.map((item, itemIndex) => ({
            ...item,
            order: itemIndex + 1,
          })),
        })),
      };
      console.log(tutorialData);
      alert("Tutorial created successfully!");
      router.push("/admin/tutorials");
    } catch (error) {
      console.error("Error saving tutorial:", error);
      setFormError(
        "An error occurred while saving the tutorial. Please try again."
      );
    }
  }

  const handleAccordionChange = (value: string[]) => {
    setExpandedChapters(value);
  };

  const selectChapterForBulkImport = (chapterId: string) => {
    setActiveChapterId(chapterId);
    setIsBulkImportDialogOpen(true);
  };

  const handleBulkImport = (contentItems: Partial<ContentItem>[]) => {
    if (!activeChapterId) return;

    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === activeChapterId) {
          const currentItemCount = chapter.contentItems.length;
          const newContentItems = contentItems.map((item, index) => ({
            id: `new-content-${Date.now()}-${index}`,
            title: item.title || "",
            type: item.type || "text",
            content: item.content || "",
            description: item.description,
            order: currentItemCount + index + 1,
          }));

          return {
            ...chapter,
            contentItems: [...chapter.contentItems, ...newContentItems],
          };
        }
        return chapter;
      })
    );

    setIsBulkImportDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link href="/admin/tutorials">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Create New Tutorial
          </h1>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-blue-700 hover:bg-blue-800 text-white"
          type="button"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Tutorial
        </Button>
      </div>

      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
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
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tutorial title"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The title of your tutorial as it will appear to users.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description of the tutorial"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a clear description of what users will learn
                          in this tutorial.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="orientation">
                                Orientation
                              </SelectItem>
                              <SelectItem value="doctor">Doctor</SelectItem>
                              <SelectItem value="nurse">Nurse</SelectItem>
                              <SelectItem value="pharmacy">Pharmacy</SelectItem>
                              <SelectItem value="laboratory">
                                Laboratory
                              </SelectItem>
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
                          <FormDescription>
                            The category helps users find related tutorials.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Only published tutorials are visible to users.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="estimatedDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 45 mins" {...field} />
                          </FormControl>
                          <FormDescription>
                            The approximate time it takes to complete the
                            tutorial.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter image URL" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL to the cover image for this tutorial.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
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
                <div className="flex gap-2">
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
                        onSave={handleAddChapter}
                        onCancel={() => setIsAddChapterDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
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
                          <div className="flex gap-2 mt-3">
                            <Button
                              onClick={() => openAddContentDialog(chapter.id)}
                              className="bg-blue-700 hover:bg-blue-800 text-white"
                              size="sm"
                            >
                              <Plus className="mr-2 h-3 w-3" />
                              Add Content Item
                            </Button>
                            <Button
                              onClick={() =>
                                selectChapterForBulkImport(chapter.id)
                              }
                              className="ml-2"
                              size="sm"
                              variant="outline"
                            >
                              <FileText className="mr-2 h-3 w-3" />
                              Bulk Import
                            </Button>
                          </div>
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
                    onSave={handleAddContent}
                    onCancel={() => setIsAddContentDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>

              {/* Bulk Import Dialog */}
              <Dialog
                open={isBulkImportDialogOpen}
                onOpenChange={setIsBulkImportDialogOpen}
              >
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Bulk Import Content</DialogTitle>
                    <DialogDescription>
                      Quickly add multiple content items to a chapter at once.
                    </DialogDescription>
                  </DialogHeader>
                  {activeChapterId ? (
                    <BulkContentImport
                      onImport={handleBulkImport}
                      onCancel={() => setIsBulkImportDialogOpen(false)}
                    />
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-gray-500">
                        Please select a chapter first to import content.
                      </p>
                    </div>
                  )}
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
                    title: form.getValues().title || "Tutorial Title",
                    description:
                      form.getValues().description ||
                      "Tutorial description will appear here.",
                    category: form.getValues().category,
                    status: form.getValues().status,
                    estimatedDuration: form.getValues().estimatedDuration,
                    coverImage: form.getValues().coverImage,
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
