using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        readonly private ICategoryWriteRepository _categoryWriteRepository;
        readonly private ICategoryReadRepository _categoryReadRepository;

        public CategoriesController(
            ICategoryWriteRepository categoryWriteRepository,
            ICategoryReadRepository categoryReadRepository)
        {
            _categoryWriteRepository = categoryWriteRepository;
            _categoryReadRepository = categoryReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_categoryReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(id, false);
            if (category == null)
                return NotFound("Category does not exist.");

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Category modelCategory)
        {
            await _categoryWriteRepository.AddAsync(new()
            {
                Name = modelCategory.Name,
                Description = modelCategory.Description
            });

            await _categoryWriteRepository.SaveAsync();
            return Ok("Category created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Category modelCategory)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(modelCategory.CategoryId);
            if (category == null)
                return NotFound("Category does not exist.");

            if (modelCategory.Name != null)
                category.Name = modelCategory.Name;
            if (modelCategory.Description != null)
                category.Description = modelCategory.Description;

            await _categoryWriteRepository.SaveAsync();
            return Ok("Category updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _categoryReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Category does not exist.");

            await _categoryWriteRepository.RemoveAsync(id);
            await _categoryWriteRepository.SaveAsync();
            return Ok("Category deleted.");
        }
    }
}
