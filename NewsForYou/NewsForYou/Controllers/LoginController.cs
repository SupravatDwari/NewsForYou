using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NewsForYou.Business;
using NewsForYou.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace NewsForYou.Controllers
{
    [Route("api")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IService _service;
        private IConfiguration config;

        public LoginController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            UserDetailsModel result = await _service.Login(model);
            if (result != null)
            {
                return Ok(new { authenticate = result != null, jwtToken = GenerateToken(result) });
            }
            else
            {
                return NotFound();
            }
        }

        private string GenerateToken(UserDetailsModel userCredentials)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"], null, expires: DateTime.Now.AddMinutes(1), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
