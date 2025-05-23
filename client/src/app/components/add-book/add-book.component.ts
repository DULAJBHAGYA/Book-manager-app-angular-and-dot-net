import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

import { Book, AddBookDto } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: AddBookDto = {
    title: '',
    author: '',
    isbn: '',
    description: '',
    category: '',
    publisher: '',
    publicationDate: new Date(),
    coverImageUrl: ''
  };

  constructor(private bookService: BookService, private router: Router, private location: Location,
) {}

  ngOnInit(): void {
  }

  showModal: boolean = false;
  modalTitle: string = '';
  modalMessage: string = '';
  modalType: 'success' | 'error' = 'success';

 

  onSubmit(): void {
    const bookData: AddBookDto = {
      title: this.book.title.trim(),
      description: this.book.description.trim(),
      author: this.book.author.trim(),
      isbn: this.book.isbn.trim(),
      category: this.book.category,
      publisher: this.book.publisher.trim(),
      publicationDate: this.formatDate(this.book.publicationDate),
      coverImageUrl: this.book.coverImageUrl?.trim() || undefined
    };

    this.bookService.addBook(bookData).subscribe({
      next: (response: Book) => {
        console.log('Book added successfully:', response);
        this.showSuccessModal('Success!', 'Book has been added successfully.');
      },
      error: (error) => {
        console.error('Error adding book:', error);
        this.showErrorModal('Update Failed', 'Failed to update book. Please try again.');
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
    } else {
      
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  goBack(): void {
    this.location.back();
  }

  private formatDate(date: Date | string): Date {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date;
  }
}