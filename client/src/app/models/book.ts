export interface Book {
  id?: string; 
  title: string;
  description: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  publisher: string;
  coverImageUrl?: string;
  category: string;
}

export interface AddBookDto {
  title: string;
  description: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  publisher: string;
  coverImageUrl?: string;
  category: string;
}

export interface UpdateBookDto {
  title: string;
  description: string;
  author: string;
  isbn: string;
  publicationDate: Date;
  publisher: string;
  coverImageUrl?: string;
  category: string;
}