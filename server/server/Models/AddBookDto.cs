namespace server.Models
{
    public class AddBookDto
    {
        public required string Title { get; set; }
        public string Description { get; set; }
        public required string Author { get; set; }
        public required string CoverImageUrl { get; set; }
        public required string Category { get; set; }
        public string Publisher { get; set; }
        public required string Isbn { get; set; }
        public string PublicationDate { get; set; }
    }
}
