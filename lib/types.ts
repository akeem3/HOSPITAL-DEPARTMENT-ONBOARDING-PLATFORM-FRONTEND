// Define the types for our data model
export type ContentType = "video" | "document" | "text";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  content: string; // URL for video/document, HTML for text
  description?: string;
  duration?: string; // For videos
  order: number;
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  contentItems: ContentItem[];
  order: number;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  chapters: Chapter[];
  category: string;
  status: "published" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
  author: string;
  duration: string;
}

export interface Feedback {
  id: string;
  tutorialId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  tutorialId: string;
  chapterId: string;
  contentItemId: string;
  completed: boolean;
  lastAccessed: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string; // In a real app, this would be hashed
}
