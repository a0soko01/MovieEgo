using Microsoft.AspNetCore.Identity;
using MovieEgo.DAL.DTO;
using System.Collections.Generic;

namespace MovieEgo.DAL
{
    public interface IMovieEgoRepo
    {
        public IdentityUser GetIdentityUserByEmailOrUserName(string email, string username);

        public int InsertIdentityUser(IdentityUser identityUser);

        public int InsertPost(PostDto post);
        public IEnumerable<PostDto> GetPostsByMovieId(int id);
        public int GetUserIdByEmail(string email);
    }
}
