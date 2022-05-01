using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Common;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        readonly private CategoryService _categoryService;

        public CategoriesController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ListSortWriteVm listSorting)
        {
            return Ok(await _categoryService.Get(listSorting));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _categoryService.Get(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(CategoryCreateVm modelCategory)
        {
            return Ok(await _categoryService.Post(modelCategory));
        }

        [HttpPut]
        public async Task<IActionResult> Put(CategoryUpdateVm modelCategory)
        {
            return Ok(await _categoryService.Put(modelCategory));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _categoryService.Delete(id));
        }
    }
}
