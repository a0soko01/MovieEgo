namespace MovieEgo.DAL.DTO
{
    public class PostDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Vote { get; set; }
        public int Rating { get; set; }
        public int IdentityUserId { get; set; }
        public int MovieId { get; set; }
    }
}