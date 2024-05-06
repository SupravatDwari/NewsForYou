using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsForYou.Business;
using NewsForYou.Models;

namespace NewsForYou.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AgencyController : ControllerBase
    {

        private IService _service;
        private IConfiguration config;

        public AgencyController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpGet]
        [Route("agency")]
        public async Task<IActionResult> GetAgency()
       {
            List<AgencyModel> result = await _service.GetAgency();
            if (result.Count > 0)
            {
                return Ok(new { result });
            }
            else
            {
                return NotFound(new {result});
            }
        }

        [HttpPost]
        [Route("agency")]
        [Authorize]
        public async Task<IActionResult> AddAgency(AgencyModel model)
        {
            bool flag = await _service.AddAgency(model);
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
