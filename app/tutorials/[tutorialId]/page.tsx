"use client";

import { use, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getTutorialById,
  getNextContentItem,
  getPreviousContentItem,
  getUserProgressForTutorial,
} from "@/lib/data";
import { FeedbackForm } from "@/components/feedback-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/page-container";
import { ChapterAccordion } from "@/components/chapter-accordion";
import { ContentViewer } from "@/components/content-viewer";
import type { ContentItem } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

export default function TutorialPage({
  params: asyncParams,
}: {
  params: Promise<{ tutorialId: string }>;
}) {
  const { tutorialId } = use(asyncParams); // ✅ Correctly unwraps the params
  const router = useRouter();
  const searchParams = useSearchParams();

  const tutorial = getTutorialById(tutorialId);

  const initialChapterId =
    searchParams.get("chapter") || tutorial?.chapters[0]?.id || "";
  const initialContentItemId =
    searchParams.get("content") ||
    tutorial?.chapters[0]?.contentItems[0]?.id ||
    "";

  const [activeChapterId, setActiveChapterId] = useState(initialChapterId);
  const [activeContentItemId, setActiveContentItemId] =
    useState(initialContentItemId);
  const [activeContent, setActiveContent] = useState<ContentItem | null>(null);
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  // This will be dynamic later
  const userId = "user1";

  useEffect(() => {
    if (!tutorial) return;

    const chapter = tutorial.chapters.find((c) => c.id === activeChapterId);
    const contentItem = chapter?.contentItems.find(
      (i) => i.id === activeContentItemId
    );

    if (contentItem) {
      setActiveContent(contentItem);
    } else if (tutorial.chapters.length > 0) {
      const firstChapter = tutorial.chapters[0];
      if (firstChapter.contentItems.length > 0) {
        const firstContent = firstChapter.contentItems[0];
        setActiveChapterId(firstChapter.id);
        setActiveContentItemId(firstContent.id);
        setActiveContent(firstContent);

        router.replace(
          `/tutorials/${tutorialId}?chapter=${firstChapter.id}&content=${firstContent.id}`,
          {
            scroll: false,
          }
        );
      }
    }

    const userProgress = getUserProgressForTutorial(userId, tutorialId);
    const completed = userProgress
      .filter((p) => p.completed)
      .map((p) => p.contentItemId);

    setCompletedItems(completed);

    let totalItems = 0;
    tutorial.chapters.forEach((chapter) => {
      totalItems += chapter.contentItems.length;
    });

    const progressPercentage =
      totalItems > 0 ? Math.round((completed.length / totalItems) * 100) : 0;

    setProgress(progressPercentage);
  }, [tutorial, activeChapterId, activeContentItemId, tutorialId, router]);

  const handleSelectContentItem = (
    chapterId: string,
    contentItemId: string
  ) => {
    setActiveChapterId(chapterId);
    setActiveContentItemId(contentItemId);
    router.replace(
      `/tutorials/${tutorialId}?chapter=${chapterId}&content=${contentItemId}`,
      { scroll: false }
    );
  };

  const handleNext = () => {
    const next = getNextContentItem(
      tutorialId,
      activeChapterId,
      activeContentItemId
    );
    if (next) {
      handleSelectContentItem(next.chapterId, next.contentItemId);
    }
  };

  const handlePrevious = () => {
    const prev = getPreviousContentItem(
      tutorialId,
      activeChapterId,
      activeContentItemId
    );
    if (prev) {
      handleSelectContentItem(prev.chapterId, prev.contentItemId);
    }
  };

  const handleMarkComplete = () => {
    if (!completedItems.includes(activeContentItemId)) {
      setCompletedItems([...completedItems, activeContentItemId]);

      if (tutorial) {
        let totalItems = 0;
        tutorial.chapters.forEach((chapter) => {
          totalItems += chapter.contentItems.length;
        });

        const newProgress =
          totalItems > 0
            ? Math.round(((completedItems.length + 1) / totalItems) * 100)
            : 0;

        setProgress(newProgress);
      }
    }
  };

  if (!tutorial) {
    return (
      <PageContainer>
        <h1 className="mb-4 text-2xl font-bold">Tutorial not found</h1>
        <Link href="/tutorials">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tutorials
          </Button>
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link href="/tutorials">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tutorials
        </Button>
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{tutorial.title}</h1>
        <p className="mt-2 text-muted-foreground">{tutorial.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="text-sm font-medium text-gray-700">
            {progress}% Complete
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <div className="order-2 lg:order-1">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-blue-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Chapters
                </h2>
              </div>
              <ChapterAccordion
                chapters={tutorial.chapters}
                activeChapterId={activeChapterId}
                activeContentItemId={activeContentItemId}
                completedItems={completedItems}
                onSelectContentItem={handleSelectContentItem}
              />
            </CardContent>
          </Card>
        </div>

        <div className="order-1 lg:order-2 space-y-6">
          {activeContent && (
            <ContentViewer
              contentItem={activeContent}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={
                !!getNextContentItem(
                  tutorialId,
                  activeChapterId,
                  activeContentItemId
                )
              }
              hasPrevious={
                !!getPreviousContentItem(
                  tutorialId,
                  activeChapterId,
                  activeContentItemId
                )
              }
              onComplete={handleMarkComplete}
            />
          )}

          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Feedback
            </h2>
            <FeedbackForm tutorialId={tutorialId} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
