Here’s a complete and professional `README.md` file for your **Book Manager App** built using Angular 19.2.12 for the frontend and .NET Core 9.0.300 for the backend. This includes setup instructions, sample data guidance, and detailed descriptions:

---

````markdown
# 📚 Book Manager App — Angular & .NET Core

A full-stack Book Manager application built with **Angular 19.2.12** (frontend) and **.NET Core 9.0.300** (backend). This app allows users to view, add, update, delete, search, and filter books with a clean UI and powerful backend API.

---

## 🧰 Tech Stack

- **Frontend:** Angular 19.2.12
- **Backend:** .NET Core 9.0.300 (ASP.NET Web API)
- **Database:** SQL Server (local)
- **ORM:** Entity Framework Core

---

## 🚀 Features

- 📖 View a list of books on load
- ➕ Add new books
- ✏️ Edit existing books
- 🗑️ Delete books
- 🔍 Search books by title
- 🏷️ Filter books by category
- 📄 View book details

---

## 🗃️ Sample Data

Once the backend and database are set up, **add the following sample data using the frontend "Add Book" form** to test the functionality:

<details>
<summary>📂 Click to View Sample Data</summary>

```json
[
  {
    "title": "The Great Gatsby",
    "description": "A story of wealth, love, and the American Dream in the 1920s...",
    "author": "F. Scott Fitzgerald",
    "coverImageUrl": "https://m.media-amazon.com/images/I/614VCoNRh3L._AC_UF1000,1000_QL80_.jpg",
    "category": "Romance",
    "publisher": "Charles Scribner's Sons",
    "isbn": "9780743273565",
    "publicationDate": "1925-04-10"
  },
  {
    "title": "To Kill a Mockingbird",
    "description": "Set in the American South during the 1930s...",
    "author": "Harper Lee",
    "coverImageUrl": "https://cdn.penguin.co.uk/dam-assets/books/9780434020485/9780434020485-jacket-large.jpg",
    "category": "Classic",
    "publisher": "J. B. Lippincott & Co.",
    "isbn": "9780061120084",
    "publicationDate": "1960-07-11"
  },
  ...
]
````

</details>

---

## 🛠️ Setup Instructions

### 📥 1. Clone the Repository

```bash
git clone https://github.com/your-username/Book-manager-app-angular-and-dot-net.git
cd Book-manager-app-angular-and-dot-net
```

---

## ⚙️ Backend Setup (.NET Core)

### 📍 Prerequisites

* [.NET SDK 9.0.300](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
* SQL Server (Local or SQL Server Management Studio)

### 📝 1. Update Connection String

In `appsettings.json`, update the `DefaultConnection` string to match your local SQL Server instance:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=BookDb;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;"
}
```

> Example: If using local SQL Server:

```json
"Server=DESKTOP-A59760O;Database=BookDb;Trusted_Connection=True;Encrypt=True;TrustServerCertificate=True;"
```

### 📦 2. Install Dependencies

Navigate to the backend project directory and run:

```bash
dotnet restore
```

### 🗄️ 3. Update Database

If the database is not created yet, run the following command to apply migrations and create the DB:

```bash
dotnet ef database update
```

> If you don’t have EF CLI installed, install it first:

```bash
dotnet tool install --global dotnet-ef
```

### ▶️ 4. Run the Backend

```bash
dotnet run
```

The API will be available at:
📍 `https://localhost:5001` or `http://localhost:5000`

---

## 🌐 Frontend Setup (Angular)

### 📍 Prerequisites

* [Node.js & npm](https://nodejs.org/)
* [Angular CLI](https://angular.io/cli)

### 📦 1. Install Dependencies

Navigate to the `frontend` directory:

```bash
cd frontend
npm install
```

### ▶️ 2. Run the Angular App

```bash
ng serve
```

Then visit:
🌐 `http://localhost:4200`

> Make sure the backend is running to successfully fetch book data.

---

## ✅ How to Use

1. Launch the backend (`dotnet run`) and frontend (`ng serve`).
2. Open the app in your browser: `http://localhost:4200`
3. Use the **Add Book** form to enter sample data.
4. You can:

   * Click on any book to view details
   * Edit or delete books
   * Use the search bar to find books by title
   * Filter books by category from the dropdown

---

## 🧪 Test Data Suggestion

Try adding a few books from different categories to test:

* 📘 Fiction / Romance / Classic
* 🔬 Science / Sci-Fi
* 🎃 Horror / Thriller
* 🎨 Adventure / Fantasy

---

## 📌 Notes

* Make sure SQL Server is running before you start the backend.
* If database is not created, ensure EF is installed and `dotnet ef database update` is run.
* App uses EF Core with code-first approach.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

**Dulaj**
Intern Developer | Passionate about full-stack development
Feel free to fork, clone, and contribute!
```
