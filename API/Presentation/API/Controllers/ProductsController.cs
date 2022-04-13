using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly private IProductWriteRepository _productWriteRepository;
        readonly private IProductReadRepository _productReadRepository;

        readonly private ICategoryReadRepository _categoryReadRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        public ProductsController(
            IProductWriteRepository productWriteRepository,
            IProductReadRepository productReadRepository,

            ICategoryReadRepository categoryReadRepository,
            ISellerReadRepository sellerReadRepository)

        {
            _productWriteRepository = productWriteRepository;
            _productReadRepository = productReadRepository;

            _categoryReadRepository = categoryReadRepository;
            _sellerReadRepository = sellerReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_productReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Product product = await _productReadRepository.GetByIdAsync(id, false);
            if (product == null)
                return NotFound("Product does not exist.");

            return Ok(product);
        }

        [HttpGet("ByCategory/{id}")]
        public async Task<IActionResult> ByCategory(int id)
        {
            if (await _categoryReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Category does not exist.");

            return Ok(_productReadRepository.GetWhere(product => product.CategoryId == id, false));
        }

        [HttpGet("BySeller/{id}")]
        public async Task<IActionResult> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Seller does not exist.");

            return Ok(_productReadRepository.GetWhere(product => product.SellerId == id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Product modelProduct)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(modelProduct.CategoryId);
            if (category == null)
                return NotFound("Category does not exist.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(modelProduct.SellerId);
            if (seller == null)
                return NotFound("Seller does not exist.");

            await _productWriteRepository.AddAsync(new()
            {
                Name = modelProduct.Name,
                Description = modelProduct.Description,
                Price = modelProduct.Price,
                Stock = modelProduct.Stock,
                Category = category,
                Seller = seller
            });

            await _productWriteRepository.SaveAsync();
            return Ok("Product created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Product modelProduct)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelProduct.ProductId);
            if (product == null)
                return NotFound("Product does not exist.");

            if (modelProduct.Name != null)
                product.Name = modelProduct.Name;
            if (modelProduct.Description != null)
                product.Description = modelProduct.Description;
            if (modelProduct.Price != null)
                product.Price = (decimal)modelProduct.Price;
            if (modelProduct.Stock != null)
                product.Stock = (int)modelProduct.Stock;
            if (modelProduct.CategoryId != null)
            {
                int categoryId = (int)modelProduct.CategoryId;
                Category category = await _categoryReadRepository.GetByIdAsync(categoryId);
                product.Category = category;
            }

            await _productWriteRepository.SaveAsync();
            return Ok("Product updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Product does not exist.");

            await _productWriteRepository.RemoveAsync(id);
            await _productWriteRepository.SaveAsync();
            return Ok("Product deleted.");
        }
    }
}
