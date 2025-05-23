# Book-manager-app-angular-and-dot-net

This is a full-stack book management application built with Angular 19.2.12 frontend and .NET Core 9.0.300 backend.

## App Overview

When the app loads, it displays a list of books. Since the database is not hosted or pre-populated initially, you need to set up the database locally and add books manually using the "Add Book" feature with the sample data provided below. After adding books, you can:

* View book details
* Edit book information
* Delete books
* Search and filter books by category

---

## Database Setup

This app uses **Microsoft SQL Server** as the database.

* The connection string is configured in the backend's `appsettings.json` file.
* Make sure you have MS SQL Server installed and running locally.
* Replace the server name in the connection string with your own SQL Server instance.
* The database will be created and updated automatically via Entity Framework migrations.

### Connection String Example (in `appsettings.json`)

```json
"DefaultConnection": "Server=YOUR_SQL_SERVER_INSTANCE;Database=BookDb;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;"
```

Replace `YOUR_SQL_SERVER_INSTANCE` with your actual SQL Server instance name, e.g., `DESKTOP-A59760O`.

---

## How to Clone and Setup

### Clone the repository's main branch

```bash
git clone -b main <repository-url>
```

---

## Backend Setup (.NET Core 9.0.300)

1. Navigate to the backend folder.
2. Restore dependencies:

```bash
dotnet restore
```

3. Apply database migrations (this will create the database and tables):

```bash
dotnet ef database update
```

4. Run the backend server:

```bash
dotnet run
```

---

## Frontend Setup (Angular 19.2.12)

1. Navigate to the frontend folder.
2. Install dependencies:

```bash
npm install
```

3. Run the Angular app:

```bash
ng serve
```

---

## Sample Data to Add Books

Use the following sample book data to add books manually through the frontend interface.

```json
[  
  { "title": "The Great Gatsby", "description": "A story of wealth, love, and the American Dream...", "author": "F. Scott Fitzgerald", "coverImageUrl": "...", "category": "Romance", "publisher": "Charles Scribner's Sons", "isbn": "9780743273565", "publicationDate": "1925-04-10" },  
  { "title": "To Kill a Mockingbird", "description": "Set in the American South during the 1930s...", "author": "Harper Lee", "coverImageUrl": "...", "category": "Classic", "publisher": "J. B. Lippincott & Co.", "isbn": "9780061120084", "publicationDate": "1960-07-11" },
  ...
]

