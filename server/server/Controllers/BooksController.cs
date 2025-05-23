using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Data;
using server.Models;
using server.Models.Entities;

namespace server.Controllers
{
    //localhost:xxxx/api/books
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public BooksController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var allBooks = dbContext.Books.ToList();

            return Ok(allBooks);    
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetBookById(Guid id) 
        {
            var book = dbContext.Books.Find(id);

            if (book is null)
            {
                return NotFound();
            }

            return Ok(book);
        }



        [HttpPost]
        public IActionResult AddBook(AddBookDto addBookDto)
        {
            var bookEntity = new Book()
            {
                Title = addBookDto.Title,
                Description = addBookDto.Description,
                Author = addBookDto.Author,
                Isbn = addBookDto.Isbn,
                PublicationDate = addBookDto.PublicationDate,
                Publisher = addBookDto.Publisher,
                CoverImageUrl = addBookDto.CoverImageUrl,
                Category = addBookDto.Category,
            };

            dbContext.Books.Add(bookEntity);
            dbContext.SaveChanges();

            return Ok(bookEntity);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateBook(Guid id, UpdateBookDto updateBookDto) 
        {
            var book = dbContext.Books.Find(id);

            if (book is null)
            {
                return NotFound();
            }

            book.Title = updateBookDto.Title;
            book.Description = updateBookDto.Description;
            book.Author = updateBookDto.Author;
            book.Publisher = updateBookDto.Publisher;
            book.Category = updateBookDto.Category;
            book.PublicationDate = updateBookDto.PublicationDate;
            book.CoverImageUrl = updateBookDto.CoverImageUrl;
            book.PublicationDate = updateBookDto.PublicationDate;

            dbContext.SaveChanges();

            return Ok(book);
        }


        [HttpDelete]
        [Route("{id:guid}")]

        public IActionResult DeleteBook(Guid id)
        {
            var book = dbContext.Books.Find(id);

            if(book is null)
            {
                return NotFound();
            }
            dbContext.Books.Remove(book);
            dbContext.SaveChanges();

            return Ok();
        }


    }
}
