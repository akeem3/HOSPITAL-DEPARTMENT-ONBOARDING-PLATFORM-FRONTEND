import type { Tutorial, Chapter, ContentItem } from "./types";

// Get all tutorials
export async function getTutorials(): Promise<Tutorial[]> {
  const res = await fetch("http://localhost/mch-api/tutorials/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tutorials");
  }

  return res.json();
}

// Get a single tutorial by ID
export async function getTutorialById(id: string): Promise<Tutorial> {
  const res = await fetch(`http://localhost/mch-api/tutorials/?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Tutorial not found");
  }

  return res.json();
}

// Get a single chapter by ID
export function getChapterById(
  tutorial: Tutorial,
  chapterId: string
): Chapter | undefined {
  return tutorial.chapters.find(
    (chapter) => chapter?.id?.toString() === chapterId
  );
}

// Get a single content item by ID
export function getContentItemById(
  tutorial: Tutorial,
  chapterId: string,
  contentItemId: string
): ContentItem | undefined {
  const chapter = getChapterById(tutorial, chapterId);
  return chapter?.contentItems.find(
    (item) => item?.id?.toString() === contentItemId
  );
}

// Get next content item
export function getNextContentItem(
  tutorial: Tutorial,
  chapterId: string,
  contentItemId: string
): { tutorialId: string; chapterId: string; contentItemId: string } | null {
  const chapter = getChapterById(tutorial, chapterId);
  if (!chapter) return null;

  const index = chapter.contentItems.findIndex(
    (item) => item?.id?.toString() === contentItemId
  );

  if (index < chapter.contentItems.length - 1) {
    const nextItem = chapter.contentItems[index + 1];
    if (nextItem?.id != null) {
      return {
        tutorialId: tutorial.id.toString(),
        chapterId,
        contentItemId: nextItem.id.toString(),
      };
    }
  }

  const chapterIndex = tutorial.chapters.findIndex(
    (c) => c?.id?.toString() === chapterId
  );
  const nextChapter = tutorial.chapters[chapterIndex + 1];

  if (nextChapter && nextChapter.contentItems.length > 0) {
    const nextItem = nextChapter.contentItems[0];
    if (nextChapter.id != null && nextItem?.id != null) {
      return {
        tutorialId: tutorial.id.toString(),
        chapterId: nextChapter.id.toString(),
        contentItemId: nextItem.id.toString(),
      };
    }
  }

  return null;
}

// Get previous content item
export function getPreviousContentItem(
  tutorial: Tutorial,
  chapterId: string,
  contentItemId: string
): { tutorialId: string; chapterId: string; contentItemId: string } | null {
  const chapter = getChapterById(tutorial, chapterId);
  if (!chapter) return null;

  const index = chapter.contentItems.findIndex(
    (item) => item?.id?.toString() === contentItemId
  );

  if (index > 0) {
    const prevItem = chapter.contentItems[index - 1];
    if (prevItem?.id != null) {
      return {
        tutorialId: tutorial.id.toString(),
        chapterId,
        contentItemId: prevItem.id.toString(),
      };
    }
  }

  const chapterIndex = tutorial.chapters.findIndex(
    (c) => c?.id?.toString() === chapterId
  );
  const prevChapter = tutorial.chapters[chapterIndex - 1];

  if (
    prevChapter &&
    prevChapter.contentItems.length > 0 &&
    prevChapter.id != null
  ) {
    const lastItem =
      prevChapter.contentItems[prevChapter.contentItems.length - 1];
    if (lastItem?.id != null) {
      return {
        tutorialId: tutorial.id.toString(),
        chapterId: prevChapter.id.toString(),
        contentItemId: lastItem.id.toString(),
      };
    }
  }

  return null;
}
