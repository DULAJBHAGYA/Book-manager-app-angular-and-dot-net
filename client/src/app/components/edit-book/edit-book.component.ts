import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Book, UpdateBookDto } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  standalone: true,
  selector: 'app-edit-book',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  book: Book = {
    title: '',
    author: '',
    isbn: '',
    description: '',
    category: '',
    publisher: '',
    publicationDate: new Date(),
    coverImageUrl: ''
  };

  bookId: string = '';
  isLoading: boolean = true;
  
  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  modalType: 'success' | 'error' = 'success';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId = id;
      this.loadBook(id);
    } else {
      console.error('No book ID provided');
      this.router.navigate(['/']);
    }
  }

  loadBook(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (book: Book) => {
        if (book) {
          this.book = {
            ...book
          };
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.showErrorModal('Failed to Load', 'Failed to load book details. Please try again.');
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    if (!this.bookId) {
      console.error('No book ID available for update');
      return;
    }

    const updateData: UpdateBookDto = {
      title: this.book.title.trim(),
      description: this.book.description.trim(),
      author: this.book.author.trim(),
      isbn: this.book.isbn.trim(),
      category: this.book.category,
      publisher: this.book.publisher.trim(),
      publicationDate: this.formatDate(this.book.publicationDate),
      coverImageUrl: this.book.coverImageUrl?.trim() || undefined
    };

    this.bookService.updateBook(this.bookId, updateData).subscribe({
      next: (response: Book) => {
        console.log('Book updated successfully:', response);
        this.showSuccessModal('Success!', 'Book has been updated successfully.');
      },
      error: (error) => {
        console.error('Error updating book:', error);
        this.showErrorModal('Update Failed', 'Failed to update book. Please try again.');
      }
    });
  }

  getDateForInput(date: Date | string): string {
    if (typeof date === 'string') {
      const dateObj = new Date(date);
      return dateObj.toISOString().split('T')[0];
    }
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    }
    return new Date().toISOString().split('T')[0];
  }

  private formatDate(date: Date | string): Date {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date;
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
      this.router.navigate(['/book-details', this.bookId]);
    } else {
      
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}