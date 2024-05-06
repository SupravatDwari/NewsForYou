using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsForYou.Business;
using NewsForYou.Models;

namespace NewsForYou.Controllers
{
    [Route("api")]
    [ApiController]
    public class AgencyFeedController : ControllerBase
    {
        private IService _service;
        private IConfiguration config;

        public AgencyFeedController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpPost]
        [Route("addagencyfeed")]
        [Authorize]
        public async Task<IActionResult> AddAgencyFeed(AgencyFeedModel model)
        {
            bool flag = await _service.AddAgencyFeed(model);
            if (flag)
            {
                return Ok(new { flag });
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
