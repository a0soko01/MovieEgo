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
    public class LoginController: ControllerBase
    {
        private readonly IMovieEgoRepo _movieEgoRepo;
        private readonly JwtHandler _jwtHandler;
        public LoginController(/*IMovieEgoRepo movieEgoRepo,*/ JwtHandler jwtHandler)
        {
            //_movieEgoRepo = movieEgoRepo;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            /*var user = _movieEgoRepo.Login("username", "hashedPassword"); 
            if (user == null)
            {
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            }*/
            var user = new IdentityUser();
            user.Email = "test";
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }
    }
}
