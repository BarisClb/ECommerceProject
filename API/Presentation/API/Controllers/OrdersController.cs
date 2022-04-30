using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Common;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        readonly private OrderService _orderService;

        public OrdersController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] Pagination pagination)
        {
            return Ok(await _orderService.Get(pagination));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _orderService.Get(id));
        }

        [HttpGet("ByProduct/{id}")]
        public async Task<IActionResult> ByProduct(int id)
        {
            return Ok(await _orderService.ByProduct(id));
        }

        [HttpGet("ByUser/{id}")]
        public async Task<IActionResult> ByUser(int id)
        {
            return Ok(await _orderService.ByUser(id));
        }

        [HttpGet("BySeller/{id}")]
        public async Task<IActionResult> BySeller(int id)
        {
            return Ok(await _orderService.BySeller(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(OrderCreateVm modelOrder)
        {
            return Ok(await _orderService.Post(modelOrder));
        }

        [HttpPut]
        public async Task<IActionResult> Put(OrderUpdateVm modelOrder)
        {
            return Ok(await _orderService.Put(modelOrder));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _orderService.Delete(id));
        }
    }
}
