using Microsoft.AspNetCore.Identity;

namespace MovieEgo.DAL
{
    public interface IMovieEgoRepo
    {
        public IdentityUser Login(string username, string password);
    }
}
