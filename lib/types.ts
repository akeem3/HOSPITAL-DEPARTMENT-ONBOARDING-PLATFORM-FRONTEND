export type ContentType = "video" | "document" | "text";

export interface ContentItem {
  id?: string | number; // Optional for creation
  title: string;
  type: ContentType;
  content: string;
  description?: string;
  duration?: string;
  order_num: number;
}

export interface Chapter {
  id?: string | number;
  title: string;
  description?: string; // ← change here
  contentItems: ContentItem[];
  order_num: number;
}

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

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password: string;
}
