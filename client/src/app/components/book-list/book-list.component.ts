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
  
  sortOption: string = 'newest';
  categories: string[] = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Fantasy', 'History', 'Horror', 'Mystery', 'Romance', 'Sci-fi'];
  selectedCategories: string[] = [];
  
  isFilterOpen: boolean = false;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading books:', error);
        alert('Failed to load books. Please check if the server is running.');
      }
    });
  }

  deleteBook(id: string | undefined): void {
    if (!id) {
      alert('Invalid book ID');
      return;
    }

    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
          alert('Book deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete book. Please try again.');
        }
      });
    }
  }

  searchBooks(): void {
    this.applyFilters();
  }
    
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
        
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.isbn.toLowerCase().includes(term)
      );
    }
        
    if (this.selectedCategories.length > 0) {
      result = result.filter(book => {
        if (!book.category) return false;
        return this.selectedCategories.includes(book.category);
      });
    }
        
    switch (this.sortOption) {
      case 'newest':
        result.sort((a, b) => {
          const dateA = new Date(a.publicationDate);
          const dateB = new Date(b.publicationDate);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'oldest':
        result.sort((a, b) => {
          const dateA = new Date(a.publicationDate);
          const dateB = new Date(b.publicationDate);
          return dateA.getTime() - dateB.getTime();
        });
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

  viewBookDetails(bookId: string | undefined): void {
    if (bookId) {
      this.router.navigate(['/book', bookId]);
    }
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }
}