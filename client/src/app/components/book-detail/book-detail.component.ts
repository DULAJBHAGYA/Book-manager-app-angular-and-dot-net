import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  loading: boolean = true;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBook(+id).subscribe({
        next: (book) => {
          this.book = book;
          this.loading = false;
          this.checkFavoriteStatus();
        },
        error: (error) => {
          console.error('Error fetching book:', error);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    if (!this.book) return;
    
    this.isFavorite = !this.isFavorite;
    
    // Here you would typically call a service method to update the favorite status
    // this.bookService.toggleFavorite(this.book.id, this.isFavorite);
    
    // For now, we'll just toggle the local state
    console.log(`Book ${this.book.title} ${this.isFavorite ? 'added to' : 'removed from'} favorites`);
  }

  deleteBook(): void {
    if (!this.book) return;
    
    const confirmed = confirm(`Are you sure you want to delete "${this.book.title}"? This action cannot be undone.`);
    
    if (confirmed) {
      this.bookService.deleteBook(this.book.id!).subscribe({
        next: () => {
          console.log('Book deleted successfully');
          this.router.navigate(['/books']);
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete book. Please try again.');
        }
      });
    }
  }

  private checkFavoriteStatus(): void {
    if (!this.book) return;
    
    // Here you would typically check if the book is in the user's favorites
    // this.isFavorite = this.bookService.isFavorite(this.book.id);
    
    // For now, we'll just set it to false
    this.isFavorite = false;
  }
}