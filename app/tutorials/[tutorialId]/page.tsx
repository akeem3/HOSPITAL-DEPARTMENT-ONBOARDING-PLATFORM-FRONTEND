"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  getTutorialById,
  getNextContentItem,
  getPreviousContentItem,
  getContentItemById,
} from "@/lib/data";
import { PageContainer } from "@/components/page-container";
import { ChapterAccordion } from "@/components/chapter-accordion";
import { ContentViewer } from "@/components/content-viewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Tutorial, ContentItem } from "@/lib/types";

export default function TutorialDetailPage() {
  const { tutorialId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string>("");
  const [activeContentItemId, setActiveContentItemId] = useState<string>("");
  const [activeContent, setActiveContent] = useState<ContentItem | null>(null);

  useEffect(() => {
    async function fetchTutorial() {
      try {
        const data = await getTutorialById(tutorialId as string);
        setTutorial(data);

        const firstChapterId = data.chapters[0]?.id;
        const firstContentItemId = data.chapters[0]?.contentItems[0]?.id;

        const chapterParam =
          searchParams.get("chapter") ?? firstChapterId?.toString() ?? "";
        const contentParam =
          searchParams.get("content") ?? firstContentItemId?.toString() ?? "";

        setActiveChapterId(chapterParam);
        setActiveContentItemId(contentParam);

        const content = getContentItemById(data, chapterParam, contentParam);
        setActiveContent(content || null);
      } catch (err) {
        console.error("Failed to load tutorial:", err);
      }
    }

    fetchTutorial();
  }, [tutorialId, searchParams]);

  const handleSelectContentItem = (
    chapterId: string,
    contentItemId: string
  ) => {
    setActiveChapterId(chapterId);
    setActiveContentItemId(contentItemId);
    const newUrl = `/tutorials/${tutorialId}?chapter=${chapterId}&content=${contentItemId}`;
    router.replace(newUrl, { scroll: false });

    if (tutorial) {
      const content = getContentItemById(tutorial, chapterId, contentItemId);
      setActiveContent(content || null);
    }
  };

  const handleNext = () => {
    if (!tutorial) return;
    const next = getNextContentItem(
      tutorial,
      activeChapterId,
      activeContentItemId
    );
    if (next) {
      handleSelectContentItem(next.chapterId, next.contentItemId);
    }
  };

  const handlePrevious = () => {
    if (!tutorial) return;
    const prev = getPreviousContentItem(
      tutorial,
      activeChapterId,
      activeContentItemId
    );
    if (prev) {
      handleSelectContentItem(prev.chapterId, prev.contentItemId);
    }
  };

  if (!tutorial) {
    return (
      <PageContainer>
        <h1 className="text-2xl font-bold mb-4">Tutorial not found</h1>
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
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        <div className="order-2 lg:order-1">
          <div className="sticky top-20">
            <div className="p-4 border rounded-lg shadow-sm">
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
                onSelectContentItem={handleSelectContentItem}
              />
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-6">
          {activeContent && (
            <ContentViewer
              contentItem={activeContent}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={
                !!getNextContentItem(
                  tutorial,
                  activeChapterId,
                  activeContentItemId
                )
              }
              hasPrevious={
                !!getPreviousContentItem(
                  tutorial,
                  activeChapterId,
                  activeContentItemId
                )
              }
              onComplete={() => {}}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
