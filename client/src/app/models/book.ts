export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: string;
  coverImageUrl?: string; 
  category?: string;
  publisher?: string;
  description?: string,
}