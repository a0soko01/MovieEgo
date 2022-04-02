using System.Collections.Generic;
using System.Data;
using Dapper;
using Microsoft.AspNetCore.Identity;
using MovieEgo.DAL.DTO;

namespace MovieEgo.DAL
{
    public class MovieEgoRepo: IMovieEgoRepo
    {
        private readonly IDbConnection _dBConnection;

        public MovieEgoRepo(IDbConnection dbConnection)
        {
            _dBConnection = dbConnection;
        }

        public IdentityUser GetIdentityUserByEmailOrUserName(string email, string username)
        {
            const string sql = @"SELECT * FROM IdentityUser WHERE Email = @Email OR UserName = @UserName";
            return _dBConnection.QueryFirstOrDefault<IdentityUser>(sql, new { email, username});
        }

        public int InsertIdentityUser(IdentityUser identityUser)
        {
            const string sql = @"INSERT INTO [dbo].[IdentityUser]([UserName], [Email], [PasswordHash]) VALUES (@UserName, @Email, @PasswordHash)";
            return _dBConnection.Execute(sql, new
            {
                identityUser.UserName,
                identityUser.Email,
                identityUser.PasswordHash
            });
        }

        public int InsertPost(PostDto post)
        {
            const string sql = @"INSERT INTO [dbo].[Post]([Content], [Vote], [Rating], [IdentityUserId], [MovieId]) VALUES (@Content, @Vote, @Rating, @IdentityUserId, @MovieId)";
            return _dBConnection.Execute(sql, new
            {
                post.Content,
                post.Vote,
                post.Rating,
                post.IdentityUserId,
                post.MovieId
            });
        }

        public IEnumerable<PostDto> GetPostsByMovieId(int id)
        {
            const string sql = @"SELECT * FROM [dbo].[Post] WHERE MovieId = @MovieId";
            return _dBConnection.Query<PostDto>(sql, new { id });
        }

        public int GetUserIdByEmail(string email)
        {
            const string sql = @"SELECT [Id] FROM [dbo].[IdentityUser] WHERE Email = @Email";
            return _dBConnection.QueryFirst<int>(sql, new { email });
        }
    }
}
