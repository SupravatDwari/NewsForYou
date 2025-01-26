using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NewsForYou.Business;
//using NewsForYou.DAL.Models;
using NewsForYou.Models;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NewsForYou.Controllers
{
    [Route("api")]
    [ApiController]
    public class NewsForYouController : ControllerBase
    {
        private IService _service;
        private IConfiguration config;

        public NewsForYouController(IService service,IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpGet]
        [Route("incrementnewsclickcount")]
        public async Task<IActionResult> IncrementNewsClickCount(int id)
        {
            bool flag = true;
            return Ok(new { flag });
        }
    }
}
