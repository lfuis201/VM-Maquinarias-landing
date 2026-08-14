export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime?: string;
  image?: string;
  date?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
