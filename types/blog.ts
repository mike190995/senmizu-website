export interface TextContent {
  type: 'text';
  content: string;
}

export interface ImageContent {
  type: 'image';
  src: string;
  alt?: string;
  position?: 'left' | 'right' | 'full';
}

export interface HeadingContent {
  type: 'heading';
  content: string;
}

export interface ListContent {
  type: 'list';
  content: string[]; // Array of list items, allowing HTML
}

export type BlogContentBlock = TextContent | ImageContent | HeadingContent | ListContent;

export interface BlogPost {
  id: string;
  title: string;
  content?: BlogContentBlock[];
  url?: string;
  audioSrc?: string;
  date: string;
  featuredImage: string;
  bannerImage: string;
  category: string;
  readTime: string;
  tags?: string[];
}