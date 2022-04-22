using Infrastructure.Dtos.Request;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly private ProductService _productService;

        public ProductsController(ProductService productService)

        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _productService.Get());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _productService.Get(id));
        }

        [HttpGet("ByCategory/{id}")]
        public async Task<IActionResult> ByCategory(int id)
        {
            return Ok(await _productService.ByCategory(id));
        }

        [HttpGet("BySeller/{id}")]
        public async Task<IActionResult> BySeller(int id)
        {
            return Ok(await _productService.BySeller(id));
        }

        [HttpGet("ProductPage")]
        public async Task<IActionResult> GetCategoryAndProducts(int id)
        {
            return Ok(await _productService.GetProductPage(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(ProductCreateVm modelProduct)
        {
            return Ok(await _productService.Post(modelProduct));
        }

        [HttpPut]
        public async Task<IActionResult> Put(ProductUpdateVm modelProduct)
        {
            return Ok(await _productService.Put(modelProduct));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _productService.Delete(id));
        }
    }
}
