export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogContent {
  intro: string;
  sections: BlogSection[];
  conclusion: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;       // E.g., "March 12, 2026"
  readTime: string;   // E.g., "7 min read"
  image: string;      // URL to the image storage
  content: BlogContent;
  createdAt?: number; // UNIX timestamp
}
