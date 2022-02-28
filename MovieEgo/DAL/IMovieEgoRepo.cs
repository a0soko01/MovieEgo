using Microsoft.AspNetCore.Identity;

namespace MovieEgo.DAL
{
    public interface IMovieEgoRepo
    {
        public IdentityUser GetIdentityUserByEmail(string email);

        public int InsertIdentityUser(IdentityUser identityUser);
    }
}
