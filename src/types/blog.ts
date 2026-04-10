export interface BlogSection {
  heading: string;
  heading_pl?: string;
  body: string;
  body_pl?: string;
}

export interface BlogContent {
  intro: string;
  intro_pl?: string;
  sections: BlogSection[];
  conclusion: string;
  conclusion_pl?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  title_pl?: string;
  excerpt: string;
  excerpt_pl?: string;
  category: string;
  category_pl?: string;
  author: string;
  date: string;
  date_pl?: string;
  readTime: string;
  readTime_pl?: string;
  image: string;
  content: BlogContent;
  createdAt?: number;
}
