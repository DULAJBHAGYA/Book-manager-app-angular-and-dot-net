import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';
  
  // New filter properties
  sortOption: string = 'newest';
  categories: string[] = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 'Sci-fi'];
  selectedCategories: string[] = [];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.applyFilters();
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  searchBooks(): void {
    this.applyFilters();
  }
  
  // New methods for filtering and sorting
  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
    this.applyFilters();
  }
  
  applySorting(): void {
    this.applyFilters();
  }
  
  applyFilters(): void {
    let result = [...this.books];
    
    // Apply search filter if search term exists
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter if any categories are selected
    if (this.selectedCategories.length > 0) {
      result = result.filter(book => {
        if (!book.category) return false;
        return this.selectedCategories.includes(book.category);
      });
    }
    
    // Apply sorting
    switch (this.sortOption) {
      case 'newest':
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'oldest':
        result.sort((a, b) => (a.id || 0) - (b.id || 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        result.sort((a, b) => a.author.localeCompare(b.author));
        break;
    }
    
    this.filteredBooks = result;
  }
  
  // New method for navigation
  viewBookDetails(bookId: number | undefined): void {
    if (bookId) {
      this.router.navigate(['/book', bookId]);
    }
  }
}