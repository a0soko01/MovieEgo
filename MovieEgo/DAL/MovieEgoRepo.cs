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

        public IdentityUser GetIdentityUserByEmail(string email)
        {
            const string sql = @"SELECT * FROM IdentityUser WHERE email = @email";
            return _dBConnection.QueryFirst<IdentityUser>(sql, new { email = email });
        }

        public int InsertIdentityUser(IdentityUser identityUser)
        {
            //@"INSERT INTO [dbo].[Customer]([FirstName], [LastName], [State], [City], [IsActive], [CreatedOn]) VALUES (@FirstName, @LastName, @State, @City, @IsActive, @CreatedOn)";
            const string sql = @"SELECT * FROM IdentityUser WHERE username = @username";
            return _dBConnection.Execute(sql, identityUser);
        }
    }
}
