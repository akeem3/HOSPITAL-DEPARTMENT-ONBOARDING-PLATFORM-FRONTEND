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
import { TutorialPreview } from "@/components/admin/tutorial-preview";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  videoUrl: z.string().optional(),
});

export default function CreateTutorialPage() {
  const [activeTab, setActiveTab] = useState("details");
  const [content, setContent] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status: "draft",
      estimatedDuration: "",
      coverImage: "",
      videoUrl: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would submit the form data to your backend
    const tutorialData = {
      ...values,
      content,
    };
    console.log(tutorialData);
    alert("Tutorial created successfully!");
    router.push("/admin/tutorials");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Link href="/admin/tutorials">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-900 hover:text-blue-700 hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-blue-700">
            Create New Tutorial
          </h1>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="bg-blue-700 hover:bg-blue-800 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Tutorial
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 text-gray-900">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Tutorial Details
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="preview"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Preview
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="pt-6">
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter tutorial title"
                            {...field}
                            className="border-gray-300 text-gray-900"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-700">
                          The title of your tutorial as it will appear to users.
                        </FormDescription>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter a detailed description of the tutorial"
                            className="min-h-[120px] border-gray-300 text-gray-900"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-700">
                          Provide a clear description of what users will learn
                          in this tutorial.
                        </FormDescription>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300 text-gray-900 bg-white">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border border-gray-300">
                              <SelectItem value="orientation">
                                Orientation
                              </SelectItem>
                              <SelectItem value="patient-care">
                                Patient Care
                              </SelectItem>
                              <SelectItem value="safety">
                                Safety & Protocols
                              </SelectItem>
                              <SelectItem value="technology">
                                Technology & Systems
                              </SelectItem>
                              <SelectItem value="communication">
                                Communication
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-700">
                            The category helps users find related tutorials.
                          </FormDescription>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300 text-gray-900 bg-white">
                                <SelectValue placeholder="Select a status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white border border-gray-300">
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="published">
                                Published
                              </SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-gray-700">
                            Only published tutorials are visible to users.
                          </FormDescription>
                          <FormMessage className="text-red-600" />
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
                          <FormLabel className="text-gray-900">
                            Estimated Duration
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 45 mins"
                              {...field}
                              className="border-gray-300 text-gray-900"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-700">
                            The approximate time it takes to complete the
                            tutorial.
                          </FormDescription>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900">
                            Cover Image URL
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter image URL"
                              {...field}
                              className="border-gray-300 text-gray-900"
                            />
                          </FormControl>
                          <FormDescription className="text-gray-700">
                            URL to the cover image for this tutorial.
                          </FormDescription>
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="videoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900">
                          Video URL
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Firebase Storage video URL"
                            {...field}
                            className="border-gray-300 text-gray-900"
                          />
                        </FormControl>
                        <FormDescription className="text-gray-700">
                          URL to the video for this tutorial (e.g., Firebase
                          Storage URL).
                        </FormDescription>
                        <FormMessage className="text-red-600" />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <Card className="border border-gray-300 shadow-sm">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <FormLabel className="text-gray-900">
                  Tutorial Content
                </FormLabel>
                <FormDescription className="text-gray-700">
                  Use the rich text editor to create the tutorial content.
                </FormDescription>
                <RichTextEditor
                  initialValue={content}
                  onChange={setContent}
                  minHeight="400px"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview" className="space-y-4">
          <TutorialPreview
            tutorial={{
              ...form.getValues(),
              content,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
