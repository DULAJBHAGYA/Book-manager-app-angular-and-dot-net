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

  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  modalType: 'success' | 'error' | 'confirm' = 'success';

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.showErrorModal('Error', 'No book ID provided');
      this.loading = false;
      return;
    }

    this.bookService.getBookById(id).subscribe({
      next: (book) => {
        this.book = book;
        this.loading = false;
        this.checkFavoriteStatus();
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.showErrorModal('Failed to Load', 'Failed to load book. Please check if the server is running.');
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    if (!this.book) return;

    this.isFavorite = !this.isFavorite;

    console.log(`Book ${this.book.title} ${this.isFavorite ? 'added to' : 'removed from'} favorites`);
  }

  showDeleteConfirmation(): void {
    if (!this.book) return;

    this.modalTitle = 'Confirm Delete';
    this.modalMessage = `Are you sure you want to delete "${this.book.title}"? This action cannot be undone.`;
    this.modalType = 'confirm';
    this.showModal = true;
  }

  confirmDelete(): void {
    if (!this.book) return;

    this.showModal = false; // Close confirmation modal first

    this.bookService.deleteBook(this.book.id!).subscribe({
      next: () => {
        console.log('Book deleted successfully');
        this.showSuccessModal('Success!', 'Book has been deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting book:', error);
        this.showErrorModal('Failed to Delete', 'Failed to delete book. Please try again.');
      }
    });
  }

  private showSuccessModal(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'success';
    this.showModal = true;
  }

  private showErrorModal(title: string, message: string): void {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalType = 'error';
    this.showModal = true;
  }

  onModalOk(): void {
    this.showModal = false;
    if (this.modalType === 'success') {
      this.router.navigate(['/']);
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  private checkFavoriteStatus(): void {
    if (!this.book) return;
    this.isFavorite = false;
  }
}