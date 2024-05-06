using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsForYou.Business;
using NewsForYou.Models;

namespace NewsForYou.Controllers
{
    [Route("api/")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private IService _service;
        private IConfiguration config;

        public NewsController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpGet]
        [Route("news")]
        public async Task<IActionResult> GetAllNews(int id)
        {
            List<NewsModel> allnews = await _service.GetAllNews(id);
            return Ok(new { allnews });
        }

        [HttpPost]
        [Route("getnewsbycategories")]
        public async Task<IActionResult> GetNewsByCategories(GetNewsByCategoriesModel model)
        {
            List<NewsModel> allnews = await _service.GetNewsByCategories(model.Categories, model.Id); 
            return Ok(new { allnews });
        }

        [HttpDelete]
        [Route("news")]
        [Authorize]
        public async Task<IActionResult> DeleteAllNews()
        {
            bool flag = await _service.DeleteAllNews();
            return Ok(new { flag });
        }
    }
}
