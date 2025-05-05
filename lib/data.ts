// Mock data for tutorials
export const tutorials = [
  {
    id: "1",
    title: "Patient Registration System",
    description:
      "Learn how to use the patient registration system effectively.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // YouTube URL example
    content:
      "<p>This tutorial covers the basics of the patient registration system.</p><h2>Getting Started</h2><p>First, log in to the system using your credentials.</p><h2>Creating a New Patient Record</h2><p>Click on the 'New Patient' button and fill in the required information.</p>",
    createdAt: "2023-05-15",
    updatedAt: "2023-06-10",
    status: "published",
    author: "Dr. Smith",
    lastUpdated: "2023-06-10",
    duration: "30 mins",
  },
  {
    id: "2",
    title: "Electronic Health Records",
    description: "A comprehensive guide to managing electronic health records.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://youtu.be/jNQXAC9IVRw", // Short YouTube URL example
    content:
      "<p>This tutorial explains how to use the Electronic Health Records system.</p><h2>Accessing Patient Records</h2><p>Search for patients using their ID or name.</p><h2>Updating Medical Information</h2><p>Select the appropriate section and enter the new information.</p>",
    createdAt: "2023-04-20",
    updatedAt: "2023-05-25",
    status: "published",
    author: "Nurse Johnson",
    lastUpdated: "2023-05-25",
    duration: "45 mins",
  },
  {
    id: "3",
    title: "Medication Management",
    description: "Learn how to manage medications in the hospital system.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl:
      "https://firebasestorage.example.com/videos/medication-management.mp4", // Firebase URL example
    content:
      "<p>This tutorial covers medication management procedures.</p><h2>Prescribing Medications</h2><p>Select from the medication database and specify dosage.</p><h2>Medication Administration Record</h2><p>Document when medications are administered to patients.</p>",
    createdAt: "2023-03-10",
    updatedAt: "2023-04-15",
    status: "draft",
    author: "Admin User",
    lastUpdated: "2023-04-15",
    duration: "60 mins",
  },
  {
    id: "4",
    title: "Laboratory Results System",
    description: "Guide to accessing and interpreting laboratory results.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    videoUrl: "https://www.youtube.com/embed/C0DPdy98e4c", // YouTube embed URL example
    content:
      "<p>This tutorial explains how to work with the laboratory results system.</p><h2>Ordering Lab Tests</h2><p>Select the appropriate tests from the catalog.</p><h2>Viewing Results</h2><p>Access results through the patient's record or the lab module.</p>",
    createdAt: "2023-02-05",
    updatedAt: "2023-03-20",
    status: "archived",
    author: "Dr. Martinez",
    lastUpdated: "2023-03-20",
    duration: "35 mins",
  },
];

// Mock data for feedback
export const feedback = [
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
    comment: "Excellent explanation of the EHR system.",
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

// Get tutorial by ID
export function getTutorialById(id: string) {
  return tutorials.find((tutorial) => tutorial.id === id);
}

// Get all tutorials
export function getTutorials() {
  return tutorials;
}

// Get feedback for a tutorial
export function getFeedbackForTutorial(tutorialId: string) {
  return feedback.filter((item) => item.tutorialId === tutorialId);
}
