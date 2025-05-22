import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BookListComponent } from './app/components/book-list/book-list.component';
import { AddBookComponent } from './app/components/add-book/add-book.component';
import { EditBookComponent } from './app/components/edit-book/edit-book.component';
import { BookDetailComponent } from './app/components/book-detail/book-detail.component';

import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FormsModule, FontAwesomeModule)
  ]
}).catch(err => console.error(err));
