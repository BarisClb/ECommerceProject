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
            return Ok(await _productReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Product modelProduct)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(modelProduct.CategoryId);
            Seller seller = await _sellerReadRepository.GetByIdAsync(modelProduct.SellerId);

            await _productWriteRepository.AddAsync(new()
            {
                Name = modelProduct.Name,
                Description = modelProduct.Description,
                Price = modelProduct.Price,
                Stock = modelProduct.Stock,
                Category = category,
                CreatedBy = seller
            });

            return Ok(await _productWriteRepository.SaveAsync());
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Product model)
        {
            Product product = await _productReadRepository.GetByIdAsync(model.ProductId);

            if (model.Name != null)
                product.Name = model.Name;
            if (model.Description != null)
                product.Description = model.Description;
            if (model.Price != null)
                product.Price = (decimal)model.Price;
            if (model.Stock != null)
                product.Stock = (int)model.Stock;
            if (model.CategoryId != null)
            {
                int categoryId = (int)model.CategoryId;
                Category category = await _categoryReadRepository.GetByIdAsync(categoryId);
                product.Category = category;
            }

            await _productWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _productWriteRepository.RemoveAsync(id);
            await _productWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
