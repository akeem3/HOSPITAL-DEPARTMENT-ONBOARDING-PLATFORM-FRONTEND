import type {
  Tutorial,
  Feedback,
  UserProgress,
  AdminUser,
  Chapter,
  ContentItem,
} from "./types";

// Mock data for tutorials with chapters and content items
export const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "Doctor Onboarding",
    description:
      "Complete onboarding guide for new doctors joining the hospital.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "orientation",
    chapters: [
      {
        id: "1-1",
        title: "Inpatient Procedures",
        description: "Learn about inpatient procedures and protocols.",
        order: 1,
        contentItems: [
          {
            id: "1-1-1",
            title: "Patient Admission Process",
            type: "video",
            content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            description: "Step-by-step guide to admitting new patients",
            duration: "10 mins",
            order: 1,
          },
          {
            id: "1-1-2",
            title: "Medical Records Documentation",
            type: "document",
            content: "/placeholder.svg?height=800&width=600",
            description: "Guidelines for proper documentation",
            order: 2,
          },
          {
            id: "1-1-3",
            title: "Medication Administration",
            type: "text",
            content:
              "<p>Follow these steps for medication administration:</p><ol><li>Verify patient identity</li><li>Check medication details</li><li>Document administration</li></ol>",
            order: 3,
          },
        ],
      },
      {
        id: "1-2",
        title: "Outpatient Department (OPD)",
        description: "Procedures and protocols for the outpatient department.",
        order: 2,
        contentItems: [
          {
            id: "1-2-1",
            title: "Appointment Scheduling",
            type: "video",
            content: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            description: "How to schedule and manage patient appointments",
            duration: "8 mins",
            order: 1,
          },
          {
            id: "1-2-2",
            title: "OPD Patient Flow",
            type: "text",
            content:
              "<p>The OPD patient flow follows these steps:</p><ol><li>Registration</li><li>Triage</li><li>Consultation</li><li>Investigations</li><li>Pharmacy</li><li>Follow-up scheduling</li></ol>",
            order: 2,
          },
        ],
      },
    ],
    status: "published",
    createdAt: "2023-05-15",
    updatedAt: "2023-06-10",
    author: "Dr. Smith",
    duration: "45 mins",
  },
  {
    id: "2",
    title: "Nurse Orientation",
    description: "Comprehensive orientation program for nursing staff.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "orientation",
    chapters: [
      {
        id: "2-1",
        title: "Basic Nursing Procedures",
        description: "Essential nursing procedures for daily patient care.",
        order: 1,
        contentItems: [
          {
            id: "2-1-1",
            title: "Vital Signs Monitoring",
            type: "video",
            content: "https://youtu.be/jNQXAC9IVRw",
            description: "Proper techniques for monitoring vital signs",
            duration: "12 mins",
            order: 1,
          },
          {
            id: "2-1-2",
            title: "Wound Care",
            type: "document",
            content: "/placeholder.svg?height=800&width=600",
            description: "Guidelines for wound assessment and dressing",
            order: 2,
          },
        ],
      },
      {
        id: "2-2",
        title: "Medication Administration",
        description: "Safe medication administration practices.",
        order: 2,
        contentItems: [
          {
            id: "2-2-1",
            title: "Five Rights of Medication Administration",
            type: "text",
            content:
              "<p>Always follow the five rights:</p><ol><li>Right patient</li><li>Right medication</li><li>Right dose</li><li>Right route</li><li>Right time</li></ol>",
            order: 1,
          },
          {
            id: "2-2-2",
            title: "IV Medication Administration",
            type: "video",
            content: "https://www.youtube.com/embed/C0DPdy98e4c",
            description: "Step-by-step guide to IV medication administration",
            duration: "15 mins",
            order: 2,
          },
        ],
      },
    ],
    status: "published",
    createdAt: "2023-04-20",
    updatedAt: "2023-05-25",
    author: "Nurse Johnson",
    duration: "60 mins",
  },
  {
    id: "3",
    title: "Pharmacy Procedures",
    description: "Standard operating procedures for pharmacy staff.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "pharmacy",
    chapters: [
      {
        id: "3-1",
        title: "Medication Dispensing",
        description: "Procedures for safe medication dispensing.",
        order: 1,
        contentItems: [
          {
            id: "3-1-1",
            title: "Prescription Verification",
            type: "text",
            content:
              "<p>Steps for prescription verification:</p><ol><li>Check patient information</li><li>Verify medication and dose</li><li>Check for interactions</li><li>Confirm with prescriber if needed</li></ol>",
            order: 1,
          },
        ],
      },
    ],
    status: "draft",
    createdAt: "2023-03-10",
    updatedAt: "2023-04-15",
    author: "Admin User",
    duration: "30 mins",
  },
  {
    id: "4",
    title: "Laboratory Procedures",
    description: "Standard operating procedures for laboratory staff.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "laboratory",
    chapters: [
      {
        id: "4-1",
        title: "Sample Collection",
        description: "Procedures for proper sample collection.",
        order: 1,
        contentItems: [
          {
            id: "4-1-1",
            title: "Blood Sample Collection",
            type: "video",
            content: "https://www.youtube.com/embed/C0DPdy98e4c",
            description: "Proper techniques for blood sample collection",
            duration: "10 mins",
            order: 1,
          },
        ],
      },
    ],
    status: "archived",
    createdAt: "2023-02-05",
    updatedAt: "2023-03-20",
    author: "Dr. Martinez",
    duration: "25 mins",
  },
];

// Mock data for feedback
export const feedback: Feedback[] = [
  {
    id: "1",
    tutorialId: "1",
    userId: "user1",
    rating: 4,
    comment: "Very helpful tutorial, easy to follow.",
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    tutorialId: "2",
    userId: "user2",
    rating: 5,
    comment: "Excellent explanation of nursing procedures.",
    createdAt: "2023-05-30",
  },
  {
    id: "3",
    tutorialId: "3",
    userId: "user3",
    rating: 3,
    comment: "Good content but could use more examples.",
    createdAt: "2023-04-25",
  },
];

// Mock data for user progress
export const userProgress: UserProgress[] = [
  {
    userId: "user1",
    tutorialId: "1",
    chapterId: "1-1",
    contentItemId: "1-1-2",
    completed: true,
    lastAccessed: "2023-06-20",
  },
  {
    userId: "user1",
    tutorialId: "1",
    chapterId: "1-1",
    contentItemId: "1-1-3",
    completed: false,
    lastAccessed: "2023-06-20",
  },
];

// Mock data for admin users
export const adminUsers: AdminUser[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@hospital.org",
    password: "password",
  },
  {
    id: "2",
    username: "supervisor",
    email: "supervisor@hospital.org",
    password: "supervisor123",
  },
];

// Helper functions

// Get tutorial by ID
export function getTutorialById(id: string): Tutorial | undefined {
  return tutorials.find((tutorial) => tutorial.id === id);
}

// Get all tutorials
export function getTutorials(): Tutorial[] {
  return tutorials;
}

// Get chapter by ID
export function getChapterById(
  tutorialId: string,
  chapterId: string
): Chapter | undefined {
  const tutorial = getTutorialById(tutorialId);
  return tutorial?.chapters.find((chapter) => chapter.id === chapterId);
}

// Get content item by ID
export function getContentItemById(
  tutorialId: string,
  chapterId: string,
  contentItemId: string
): ContentItem | undefined {
  const chapter = getChapterById(tutorialId, chapterId);
  return chapter?.contentItems.find((item) => item.id === contentItemId);
}

// Get feedback for a tutorial
export function getFeedbackForTutorial(tutorialId: string): Feedback[] {
  return feedback.filter((item) => item.tutorialId === tutorialId);
}

// Get user progress for a tutorial
export function getUserProgressForTutorial(
  userId: string,
  tutorialId: string
): UserProgress[] {
  return userProgress.filter(
    (item) => item.userId === userId && item.tutorialId === tutorialId
  );
}

// Calculate tutorial completion percentage
export function calculateTutorialCompletion(
  userId: string,
  tutorialId: string
): number {
  const tutorial = getTutorialById(tutorialId);
  if (!tutorial) return 0;

  let totalItems = 0;
  let completedItems = 0;

  tutorial.chapters.forEach((chapter) => {
    totalItems += chapter.contentItems.length;
    chapter.contentItems.forEach((item) => {
      const progress = userProgress.find(
        (p) =>
          p.userId === userId &&
          p.tutorialId === tutorialId &&
          p.contentItemId === item.id
      );
      if (progress?.completed) {
        completedItems++;
      }
    });
  });

  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

// Get next content item
export function getNextContentItem(
  tutorialId: string,
  chapterId: string,
  contentItemId: string
): { tutorialId: string; chapterId: string; contentItemId: string } | null {
  const tutorial = getTutorialById(tutorialId);
  if (!tutorial) return null;

  const currentChapter = tutorial.chapters.find(
    (chapter) => chapter.id === chapterId
  );
  if (!currentChapter) return null;

  const currentItemIndex = currentChapter.contentItems.findIndex(
    (item) => item.id === contentItemId
  );

  // If there's a next item in the current chapter
  if (currentItemIndex < currentChapter.contentItems.length - 1) {
    return {
      tutorialId,
      chapterId,
      contentItemId: currentChapter.contentItems[currentItemIndex + 1].id,
    };
  }

  // If we need to move to the next chapter
  const currentChapterIndex = tutorial.chapters.findIndex(
    (chapter) => chapter.id === chapterId
  );
  if (currentChapterIndex < tutorial.chapters.length - 1) {
    const nextChapter = tutorial.chapters[currentChapterIndex + 1];
    if (nextChapter.contentItems.length > 0) {
      return {
        tutorialId,
        chapterId: nextChapter.id,
        contentItemId: nextChapter.contentItems[0].id,
      };
    }
  }

  return null;
}

// Get previous content item
export function getPreviousContentItem(
  tutorialId: string,
  chapterId: string,
  contentItemId: string
): { tutorialId: string; chapterId: string; contentItemId: string } | null {
  const tutorial = getTutorialById(tutorialId);
  if (!tutorial) return null;

  const currentChapter = tutorial.chapters.find(
    (chapter) => chapter.id === chapterId
  );
  if (!currentChapter) return null;

  const currentItemIndex = currentChapter.contentItems.findIndex(
    (item) => item.id === contentItemId
  );

  // If there's a previous item in the current chapter
  if (currentItemIndex > 0) {
    return {
      tutorialId,
      chapterId,
      contentItemId: currentChapter.contentItems[currentItemIndex - 1].id,
    };
  }

  // If we need to move to the previous chapter
  const currentChapterIndex = tutorial.chapters.findIndex(
    (chapter) => chapter.id === chapterId
  );
  if (currentChapterIndex > 0) {
    const prevChapter = tutorial.chapters[currentChapterIndex - 1];
    if (prevChapter.contentItems.length > 0) {
      return {
        tutorialId,
        chapterId: prevChapter.id,
        contentItemId:
          prevChapter.contentItems[prevChapter.contentItems.length - 1].id,
      };
    }
  }

  return null;
}
