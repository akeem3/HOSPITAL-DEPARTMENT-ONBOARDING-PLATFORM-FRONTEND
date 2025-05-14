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

// Get a single tutorial by ID (with chapters + content items)
export async function getTutorialById(id: string): Promise<Tutorial> {
  const res = await fetch(`http://localhost/mch-api/tutorials/?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Tutorial not found");
  }

  return res.json();
}

// Get a single chapter by ID (from inside a tutorial)
export function getChapterById(
  tutorial: Tutorial,
  chapterId: string
): Chapter | undefined {
  return tutorial.chapters.find(
    (chapter) => chapter.id.toString() === chapterId
  );
}

// Get a single content item from a chapter
export function getContentItemById(
  tutorial: Tutorial,
  chapterId: string,
  contentItemId: string
): ContentItem | undefined {
  const chapter = getChapterById(tutorial, chapterId);
  return chapter?.contentItems.find(
    (item) => item.id.toString() === contentItemId
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
    (item) => item.id.toString() === contentItemId
  );

  if (index < chapter.contentItems.length - 1) {
    return {
      tutorialId: tutorial.id.toString(),
      chapterId,
      contentItemId: chapter.contentItems[index + 1].id.toString(),
    };
  }

  const chapterIndex = tutorial.chapters.findIndex(
    (c) => c.id.toString() === chapterId
  );
  const nextChapter = tutorial.chapters[chapterIndex + 1];

  if (nextChapter && nextChapter.contentItems.length > 0) {
    return {
      tutorialId: tutorial.id.toString(),
      chapterId: nextChapter.id.toString(),
      contentItemId: nextChapter.contentItems[0].id.toString(),
    };
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
    (item) => item.id.toString() === contentItemId
  );

  if (index > 0) {
    return {
      tutorialId: tutorial.id.toString(),
      chapterId,
      contentItemId: chapter.contentItems[index - 1].id.toString(),
    };
  }

  const chapterIndex = tutorial.chapters.findIndex(
    (c) => c.id.toString() === chapterId
  );
  const prevChapter = tutorial.chapters[chapterIndex - 1];

  if (prevChapter && prevChapter.contentItems.length > 0) {
    return {
      tutorialId: tutorial.id.toString(),
      chapterId: prevChapter.id.toString(),
      contentItemId:
        prevChapter.contentItems[
          prevChapter.contentItems.length - 1
        ].id.toString(),
    };
  }

  return null;
}

// import type { Tutorial, AdminUser, Chapter, ContentItem } from "./types";

// // Mock data for tutorials with chapters and content items
// export const tutorials: Tutorial[] = [
//   {
//     id: "1",
//     title: "Doctor Onboarding",
//     description:
//       "Complete onboarding guide for new doctors joining the hospital.",
//     thumbnail: "/placeholder.svg?height=200&width=300",
//     category: "orientation",
//     chapters: [
//       {
//         id: "1-1",
//         title: "Inpatient Procedures",
//         description: "Learn about inpatient procedures and protocols.",
//         order: 1,
//         contentItems: [
//           {
//             id: "1-1-1",
//             title: "Patient Admission Process",
//             type: "video",
//             content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//             description: "Step-by-step guide to admitting new patients",
//             duration: "10 mins",
//             order: 1,
//           },
//           {
//             id: "1-1-2",
//             title: "Medical Records Documentation",
//             type: "document",
//             content: "/placeholder.svg?height=800&width=600",
//             description: "Guidelines for proper documentation",
//             order: 2,
//           },
//           {
//             id: "1-1-3",
//             title: "Medication Administration",
//             type: "text",
//             content:
//               "<p>Follow these steps for medication administration:</p><ol><li>Verify patient identity</li><li>Check medication details</li><li>Document administration</li></ol>",
//             order: 3,
//           },
//         ],
//       },
//       {
//         id: "1-2",
//         title: "Outpatient Department (OPD)",
//         description: "Procedures and protocols for the outpatient department.",
//         order: 2,
//         contentItems: [
//           {
//             id: "1-2-1",
//             title: "Appointment Scheduling",
//             type: "video",
//             content: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
//             description: "How to schedule and manage patient appointments",
//             duration: "8 mins",
//             order: 1,
//           },
//           {
//             id: "1-2-2",
//             title: "OPD Patient Flow",
//             type: "text",
//             content:
//               "<p>The OPD patient flow follows these steps:</p><ol><li>Registration</li><li>Triage</li><li>Consultation</li><li>Investigations</li><li>Pharmacy</li><li>Follow-up scheduling</li></ol>",
//             order: 2,
//           },
//         ],
//       },
//     ],
//     createdAt: "2023-05-15",
//     updatedAt: "2023-06-10",
//     author: "Dr. Smith",
//     duration: "45 mins",
//   },
//   {
//     id: "2",
//     title: "Nurse Orientation",
//     description: "Comprehensive orientation program for nursing staff.",
//     thumbnail: "/placeholder.svg?height=200&width=300",
//     category: "orientation",
//     chapters: [
//       {
//         id: "2-1",
//         title: "Basic Nursing Procedures",
//         description: "Essential nursing procedures for daily patient care.",
//         order: 1,
//         contentItems: [
//           {
//             id: "2-1-1",
//             title: "Vital Signs Monitoring",
//             type: "video",
//             content: "https://youtu.be/jNQXAC9IVRw",
//             description: "Proper techniques for monitoring vital signs",
//             duration: "12 mins",
//             order: 1,
//           },
//           {
//             id: "2-1-2",
//             title: "Wound Care",
//             type: "document",
//             content: "/placeholder.svg?height=800&width=600",
//             description: "Guidelines for wound assessment and dressing",
//             order: 2,
//           },
//         ],
//       },
//       {
//         id: "2-2",
//         title: "Medication Administration",
//         description: "Safe medication administration practices.",
//         order: 2,
//         contentItems: [
//           {
//             id: "2-2-1",
//             title: "Five Rights of Medication Administration",
//             type: "text",
//             content:
//               "<p>Always follow the five rights:</p><ol><li>Right patient</li><li>Right medication</li><li>Right dose</li><li>Right route</li><li>Right time</li></ol>",
//             order: 1,
//           },
//           {
//             id: "2-2-2",
//             title: "IV Medication Administration",
//             type: "video",
//             content: "https://www.youtube.com/embed/C0DPdy98e4c",
//             description: "Step-by-step guide to IV medication administration",
//             duration: "15 mins",
//             order: 2,
//           },
//         ],
//       },
//     ],
//     createdAt: "2023-04-20",
//     updatedAt: "2023-05-25",
//     author: "Nurse Johnson",
//     duration: "60 mins",
//   },
//   {
//     id: "3",
//     title: "Pharmacy Procedures",
//     description: "Standard operating procedures for pharmacy staff.",
//     thumbnail: "/placeholder.svg?height=200&width=300",
//     category: "pharmacy",
//     chapters: [
//       {
//         id: "3-1",
//         title: "Medication Dispensing",
//         description: "Procedures for safe medication dispensing.",
//         order: 1,
//         contentItems: [
//           {
//             id: "3-1-1",
//             title: "Prescription Verification",
//             type: "text",
//             content:
//               "<p>Steps for prescription verification:</p><ol><li>Check patient information</li><li>Verify medication and dose</li><li>Check for interactions</li><li>Confirm with prescriber if needed</li></ol>",
//             order: 1,
//           },
//         ],
//       },
//     ],
//     createdAt: "2023-03-10",
//     updatedAt: "2023-04-15",
//     author: "Admin User",
//     duration: "30 mins",
//   },
//   {
//     id: "4",
//     title: "Laboratory Procedures",
//     description: "Standard operating procedures for laboratory staff.",
//     thumbnail: "/placeholder.svg?height=200&width=300",
//     category: "laboratory",
//     chapters: [
//       {
//         id: "4-1",
//         title: "Sample Collection",
//         description: "Procedures for proper sample collection.",
//         order: 1,
//         contentItems: [
//           {
//             id: "4-1-1",
//             title: "Blood Sample Collection",
//             type: "video",
//             content: "https://www.youtube.com/embed/C0DPdy98e4c",
//             description: "Proper techniques for blood sample collection",
//             duration: "10 mins",
//             order: 1,
//           },
//         ],
//       },
//     ],
//     createdAt: "2023-02-05",
//     updatedAt: "2023-03-20",
//     author: "Dr. Martinez",
//     duration: "25 mins",
//   },
// ];

// // Admin users (for login simulation, if needed)
// export const adminUsers: AdminUser[] = [
//   {
//     id: "1",
//     username: "admin",
//     email: "admin@hospital.org",
//     password: "password",
//   },
//   {
//     id: "2",
//     username: "supervisor",
//     email: "supervisor@hospital.org",
//     password: "supervisor123",
//   },
// ];

// // Helper functions

// export function getTutorialById(id: string): Tutorial | undefined {
//   return tutorials.find((tutorial) => tutorial.id === id);
// }

// export function getTutorials(): Tutorial[] {
//   return tutorials;
// }

// export function getChapterById(
//   tutorialId: string,
//   chapterId: string
// ): Chapter | undefined {
//   const tutorial = getTutorialById(tutorialId);
//   return tutorial?.chapters.find((chapter) => chapter.id === chapterId);
// }

// export function getContentItemById(
//   tutorialId: string,
//   chapterId: string,
//   contentItemId: string
// ): ContentItem | undefined {
//   const chapter = getChapterById(tutorialId, chapterId);
//   return chapter?.contentItems.find((item) => item.id === contentItemId);
// }

// export function getNextContentItem(
//   tutorialId: string,
//   chapterId: string,
//   contentItemId: string
// ): { tutorialId: string; chapterId: string; contentItemId: string } | null {
//   const tutorial = getTutorialById(tutorialId);
//   if (!tutorial) return null;

//   const currentChapter = tutorial.chapters.find(
//     (chapter) => chapter.id === chapterId
//   );
//   if (!currentChapter) return null;

//   const currentItemIndex = currentChapter.contentItems.findIndex(
//     (item) => item.id === contentItemId
//   );

//   if (currentItemIndex < currentChapter.contentItems.length - 1) {
//     return {
//       tutorialId,
//       chapterId,
//       contentItemId: currentChapter.contentItems[currentItemIndex + 1].id,
//     };
//   }

//   const currentChapterIndex = tutorial.chapters.findIndex(
//     (chapter) => chapter.id === chapterId
//   );
//   if (currentChapterIndex < tutorial.chapters.length - 1) {
//     const nextChapter = tutorial.chapters[currentChapterIndex + 1];
//     if (nextChapter.contentItems.length > 0) {
//       return {
//         tutorialId,
//         chapterId: nextChapter.id,
//         contentItemId: nextChapter.contentItems[0].id,
//       };
//     }
//   }

//   return null;
// }

// export function getPreviousContentItem(
//   tutorialId: string,
//   chapterId: string,
//   contentItemId: string
// ): { tutorialId: string; chapterId: string; contentItemId: string } | null {
//   const tutorial = getTutorialById(tutorialId);
//   if (!tutorial) return null;

//   const currentChapter = tutorial.chapters.find(
//     (chapter) => chapter.id === chapterId
//   );
//   if (!currentChapter) return null;

//   const currentItemIndex = currentChapter.contentItems.findIndex(
//     (item) => item.id === contentItemId
//   );

//   if (currentItemIndex > 0) {
//     return {
//       tutorialId,
//       chapterId,
//       contentItemId: currentChapter.contentItems[currentItemIndex - 1].id,
//     };
//   }

//   const currentChapterIndex = tutorial.chapters.findIndex(
//     (chapter) => chapter.id === chapterId
//   );
//   if (currentChapterIndex > 0) {
//     const prevChapter = tutorial.chapters[currentChapterIndex - 1];
//     if (prevChapter.contentItems.length > 0) {
//       return {
//         tutorialId,
//         chapterId: prevChapter.id,
//         contentItemId:
//           prevChapter.contentItems[prevChapter.contentItems.length - 1].id,
//       };
//     }
//   }

//   return null;
// }
