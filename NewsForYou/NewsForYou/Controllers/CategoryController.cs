using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsForYou.Business;
using NewsForYou.Models;

namespace NewsForYou.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private IService _service;
        private IConfiguration config;

        public CategoryController(IService service, IConfiguration configuration)
        {
            _service = service;
            config = configuration;
        }

        [HttpGet]
        [Route("category")]
        public async Task<IActionResult> GetCategory()
        {
            List<CategoryModel> result = await _service.GetCategory();
            if (result.Count > 0)
            {
                return Ok(new { result });
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [Route("getcategoriesfromagencyid")]
        public async Task<IActionResult> GetCategoriesFromAgencyId(int id)
        {
            List<CategoryModel> category = await _service.GetCategoriesFromAgencyId(id);
            if (category.Count > 0)
            {
                return Ok(new { category });
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("category")]
        public async Task<IActionResult> AddCategory(CategoryModel model)
        {
            bool flag = await _service.AddCategory(model);
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