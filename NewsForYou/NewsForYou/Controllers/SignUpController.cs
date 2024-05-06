﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsForYou.Business;
using NewsForYou.Models;

namespace NewsForYou.Controllers
{
    [Route("api")]
    [ApiController]
    public class SignUpController : ControllerBase
    {

        private IService _service;
        private IConfiguration config;

        public SignUpController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp(UserModel model)
        {
            bool flag = await _service.SignUp(model);
            return Ok(new { flag });
        }

        [HttpGet]
        [Route("checkemail")]
        public async Task<IActionResult> FindEmail(string id)
        {
            bool flag = await _service.FindEmail(id);
            return Ok(new { flag });
        }
    }
}
