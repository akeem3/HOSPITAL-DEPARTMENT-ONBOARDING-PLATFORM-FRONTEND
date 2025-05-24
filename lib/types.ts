// lib/types.ts

// Supported content types for content items
export type ContentType = "video" | "document" | "text" | "file";

// Content item inside a chapter
export interface ContentItem {
  id?: string | number; // Optional for creation
  title: string;
  type: ContentType;
  content: string; // Path or text depending on type
  description?: string;
  duration?: string;
  order_num: number;
}

// Chapter inside a tutorial
export interface Chapter {
  id?: string | number;
  title: string;
  description?: string;
  contentItems: ContentItem[];
  order_num: number;
}

// Top-level tutorial structure
export interface Tutorial {
  id: number | string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration: string;
  createdAt?: string;
  updatedAt?: string;
  chapters: Chapter[];
}

// Admin user model
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

// Blog image model (for homepage slider)
export interface BlogImage {
  id: number | string;
  image_url: string;
}
