using System.Data;
using Dapper;
using Microsoft.AspNetCore.Identity;

namespace MovieEgo.DAL
{
    public class MovieEgoRepo: IMovieEgoRepo
    {
        private readonly IDbConnection _dBConnection;

        public MovieEgoRepo(IDbConnection dbConnection)
        {
            _dBConnection = dbConnection;
        }

        public IdentityUser Login(string username, string password)
        {
            const string sql = @"SELECT * FROM IdentityUser WHERE username = @username AND password = @password";
            return _dBConnection.QueryFirst<IdentityUser>(sql, new { username = username, password = password });
        }
    }
}
