using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Common;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellersController : ControllerBase
    {
        readonly private SellerService _sellerService;

        public SellersController(SellerService sellerService)
        {
            _sellerService = sellerService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ListSortWriteVm listSorting)
        {
            return Ok(await _sellerService.Get(listSorting));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _sellerService.Get(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(SellerCreateVm modelSeller)
        {
            return Ok(await _sellerService.Post(modelSeller));
        }

        [HttpPut]
        public async Task<IActionResult> Put(SellerUpdateVm modelSeller)
        {
            return Ok(await _sellerService.Put(modelSeller));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _sellerService.Delete(id));
        }
    }
}
