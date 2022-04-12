using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        readonly private IOrderWriteRepository _orderWriteRepository;
        readonly private IOrderReadRepository _orderReadRepository;

        readonly private IProductReadRepository _productReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public OrdersController(
            IOrderWriteRepository orderWriteRepository,
            IOrderReadRepository orderReadRepository,

            IProductReadRepository productReadRepository,
            IUserReadRepository userReadRepository)
        {
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;

            _productReadRepository = productReadRepository;
            _userReadRepository = userReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_orderReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _orderReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Order modelOrder)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelOrder.ProductId);
            User user = await _userReadRepository.GetByIdAsync(modelOrder.OrderedBy);

            await _orderWriteRepository.AddAsync(new()
            {
                Description = modelOrder.Description,
                Address = modelOrder.Address,
                OrderStatus = 1,
                OrderedBy = user,
                Product = product
            });

            return Ok(await _orderWriteRepository.SaveAsync());
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Order modelOrder)
        {
            Order order = await _orderReadRepository.GetByIdAsync(modelOrder.OrderId);

            if (modelOrder.Description != null)
                order.Description = modelOrder.Description;
            if (modelOrder.Address != null)
                order.Address = modelOrder.Address;
            if (modelOrder.OrderStatus != null)
                order.OrderStatus = (byte)modelOrder.OrderStatus;

            await _orderWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _orderWriteRepository.RemoveAsync(id);
            await _orderWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
