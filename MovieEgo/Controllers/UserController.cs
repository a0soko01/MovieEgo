using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieEgo.DAL;
using MovieEgo.DAL.DTO;
using MovieEgo.JwtFeatures;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace MovieEgo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IMovieEgoRepo _movieEgoRepo;
        private readonly JwtHandler _jwtHandler;
        public UserController(IMovieEgoRepo movieEgoRepo, JwtHandler jwtHandler)
        {
            _movieEgoRepo = movieEgoRepo;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            var hasher = new PasswordHasher<IdentityUser>();
            var user = _movieEgoRepo.GetIdentityUserByEmailOrUserName(userForAuthentication.Email, userForAuthentication.Email); 
            if (user == null || hasher.VerifyHashedPassword(user, user.PasswordHash, userForAuthentication.Password) == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Incorrect email or password");
            }

            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] IdentityUser identityUser)
        {
            var user = _movieEgoRepo.GetIdentityUserByEmailOrUserName(identityUser.Email, identityUser.UserName);

            if (user == null)
            {
                var hasher = new PasswordHasher<IdentityUser>();
                string hashedPassword = hasher.HashPassword(identityUser, identityUser.PasswordHash);
                identityUser.PasswordHash = hashedPassword;
                _movieEgoRepo.InsertIdentityUser(identityUser);
            }
            else if (user.Email == identityUser.Email)
            {
                return Unauthorized("Email already in use");
            }
            else if (user.UserName == identityUser.UserName)
            {
                return Unauthorized("Username already in use");
            }

            return Ok(new JsonResult("Registration successful. Please login"));
        }

        [Authorize]
        [HttpPost("Post")]
        public async Task<IActionResult> Post([FromBody] PostDto post)
        {
            string email = User.Identity.Name;
            post.IdentityUserId = _movieEgoRepo.GetUserIdByEmail(email);
            _movieEgoRepo.InsertPost(post);
            return Ok();
        }
    }
}
