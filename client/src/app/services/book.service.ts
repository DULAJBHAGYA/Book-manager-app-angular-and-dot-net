import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
  {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      publicationDate: '1925-04-10',
      coverImageUrl: 'https://m.media-amazon.com/images/I/614VCoNRh3L._AC_UF1000,1000_QL80_.jpg',
      category: 'Romance',
      publisher: 'Charles Scribner\'s Sons',
      description: 'A story of wealth, love, and the American Dream in the 1920s, following the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      publicationDate: '1960-07-11',
      coverImageUrl: 'https://cdn.penguin.co.uk/dam-assets/books/9780434020485/9780434020485-jacket-large.jpg',
      category: 'Classic',
      publisher: 'J. B. Lippincott & Co.',
      description: 'Set in the American South during the 1930s, this novel follows young Scout Finch as her father, Atticus, defends a black man accused of raping a white woman.'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      publicationDate: '1949-06-08',
      coverImageUrl: 'https://perilous.tech/wp-content/uploads/2022/12/1984-cover.jpeg',
      category: 'Sci-fi',
      publisher: 'Secker & Warburg',
      description: 'A dystopian novel set in a totalitarian society ruled by the Party and its leader Big Brother, where even thoughts can be crimes.'
    },
    {
      id: 4,
      title: 'Jane Eyre',
      author: 'Charlotte Bronte',
      isbn: '9780451527896',
      publicationDate: '1847-10-16',
      coverImageUrl: 'https://images.booksense.com/images/320/430/9788417430320.jpg',
      category: 'Romance',
      publisher: 'Smith, Elder & Co.',
      description: 'The story of a young orphaned governess who falls in love with her employer, Mr. Rochester, and discovers the terrible secret he keeps in his mansion.'
    },
    {
      id: 5,
      title: 'The BFG',
      author: 'Roald Dahl',
      isbn: '9780451534567',
      publicationDate: '1982-01-01',
      coverImageUrl: 'https://m.media-amazon.com/images/I/81C9FTbX-8L.jpg',
      category: 'Fantasy',
      publisher: 'Jonathan Cape',
      description: 'A children\'s story about a young girl named Sophie who befriends a Big Friendly Giant and helps save the world from bad giants.'
    },
    {
      id: 6,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '9780141439518',
      publicationDate: '1813-01-28',
      coverImageUrl: 'https://readaloudrevival.com/wp-content/uploads/2016/05/Pride-and-Prejudice.png',
      category: 'Romance',
      publisher: 'T. Egerton, Whitehall',
      description: 'The romantic clash between the opinionated Elizabeth Bennet and the proud Mr. Darcy in a society where manners and marriage are paramount.'
    },
    {
      id: 7,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '9780547928227',
      publicationDate: '1937-09-21',
      coverImageUrl: 'https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg',
      category: 'Fantasy',
      publisher: 'George Allen & Unwin',
      description: 'The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey to win a share of the treasure guarded by the dragon Smaug.'
    },
    {
      id: 8,
      title: 'Frankenstein',
      author: 'Mary Shelley',
      isbn: '9780486282114',
      publicationDate: '1818-01-01',
      coverImageUrl: 'https://m.media-amazon.com/images/I/81vi2WFuEfL._UF1000,1000_QL80_.jpg',
      category: 'Horror',
      publisher: 'Lackington, Hughes, Harding, Mavor & Jones',
      description: 'The story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment.'
    },
    {
      id: 9,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      isbn: '9780316769488',
      publicationDate: '1951-07-16',
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg',
      category: 'Coming-of-age',
      publisher: 'Little, Brown and Company',
      description: 'The story of Holden Caulfield and his experiences in New York City after being expelled from prep school.'
    },
    {
      id: 10,
      title: 'Moby-Dick',
      author: 'Herman Melville',
      isbn: '9781503280786',
      publicationDate: '1851-10-18',
      coverImageUrl: 'https://assets2.titleleaf.com/midamerica/product/cover/l_9781602707092_fc.jpg',
      category: 'Adventure',
      publisher: 'Richard Bentley',
      description: 'The voyage of the whaling ship Pequod and its captain Ahab, who seeks revenge on the white whale Moby Dick.'
    },
    {
      id: 11,
      title: 'Dracula',
      author: 'Bram Stoker',
      isbn: '9780486411095',
      publicationDate: '1897-05-26',
      coverImageUrl: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781476788104/dracula-9781476788104_hr.jpg',
      category: 'Horror',
      publisher: 'Archibald Constable and Company',
      description: 'The classic vampire story about Count Dracula\'s attempt to move from Transylvania to England, and the battle between Dracula and a small group of people led by Professor Abraham Van Helsing.'
    },
    {
      id: 12,
      title: 'The Martian',
      author: 'Andy Weir',
      isbn: '9780553418026',
      publicationDate: '2011-02-11',
      coverImageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg',
      category: 'Sci-fi',
      publisher: 'Crown Publishing Group',
      description: 'An astronaut becomes stranded on Mars and must find a way to survive while NASA works to rescue him.'
    },
    {
      id: 13,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      publicationDate: '1988-04-01',
      coverImageUrl: 'https://m.media-amazon.com/images/I/81pQPZAFWbL.jpg',
      category: 'Sci-fi',
      publisher: 'Bantam Books',
      description: 'A popular-science book on cosmology that explains complex concepts like the Big Bang, black holes, and relativity for a general audience.'
    },
    {
      id: 14,
      title: 'The Shining',
      author: 'Stephen King',
      isbn: '9780307743657',
      publicationDate: '1977-01-28',
      coverImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zy40Bxsm1Vn7JuOPuRmhKiM6WzgXgMfIXg&s',
      category: 'Horror',
      publisher: 'Doubleday',
      description: 'A writer takes a job as an off-season caretaker at an isolated hotel where supernatural forces influence him into violence.'
    },
    {
      id: 15,
      title: "Harry Potter and the Sorcerer's Stone",
      author: 'J.K. Rowling',
      isbn: '9780590353427',
      publicationDate: '1997-06-26',
      coverImageUrl: 'https://m.media-amazon.com/images/I/81YOuOGFCJL.jpg',
      category: 'Fantasy',
      publisher: 'Bloomsbury',
      description: 'The first novel in the Harry Potter series, following Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday.'
    }
  ];

  constructor() {}

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBook(id: number): Observable<Book | null> {
  const book = this.books.find((b) => b.id === id) ?? null;
  return of(book);
}


  addBook(book: Book): Observable<Book> {
    book.id =
      this.books.length > 0 ? Math.max(...this.books.map((b) => b.id)) + 1 : 1;
    this.books.push(book);
    return of(book);
  }

  updateBook(book: Book): Observable<Book> {
    const index = this.books.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      this.books[index] = book;
    }
    return of(book);
  }

  deleteBook(id: number): Observable<boolean> {
    const index = this.books.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
