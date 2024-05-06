using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsForYou.Business;
using NewsForYou.Models;

namespace NewsForYou.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ExportController : ControllerBase
    {

        private IService _service;
        private IConfiguration config;

        public ExportController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpGet]
        [Route("report")]
        [Authorize]
        public async Task<IActionResult> GeneratePdf([FromQuery] DateTime startdate, [FromQuery] DateTime enddate)
        {
            List<ReportModel> report = await _service.GeneratePdf(startdate, enddate);
            if (report.Count > 0)
            {
                return Ok(new { report });
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
