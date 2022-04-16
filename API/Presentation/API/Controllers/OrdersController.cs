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
        readonly private ISellerReadRepository _sellerReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public OrdersController(
            IOrderWriteRepository orderWriteRepository,
            IOrderReadRepository orderReadRepository,

            IProductReadRepository productReadRepository,
            ISellerReadRepository sellerReadRepository,
            IUserReadRepository userReadRepository)
        {
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;

            _productReadRepository = productReadRepository;
            _sellerReadRepository = sellerReadRepository;
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
            Order order = await _orderReadRepository.GetByIdAsync(id, false);
            if (order == null)
                return NotFound("Order does not exist.");

            return Ok(order);
        }

        [HttpGet("ByProduct/{id}")]
        public async Task<IActionResult> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Product does not exist.");

            return Ok(_orderReadRepository.GetWhere(order => order.ProductId == id, false));
        }

        [HttpGet("ByUser/{id}")]
        public async Task<IActionResult> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("User does not exist.");

            return Ok(_orderReadRepository.GetWhere(order => order.UserId == id, false));
        }

        [HttpGet("BySeller/{id}")]
        public async Task<IActionResult> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Seller does not exist.");

            return Ok(_orderReadRepository.GetWhere(order => order.SellerId == id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Order modelOrder)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelOrder.ProductId);
            if (product == null)
                return NotFound("Product does not exist.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(product.SellerId);
            if (seller == null)
                return NotFound("Seller does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelOrder.UserId);
            if (user == null)
                return NotFound("User does not exist.");


            await _orderWriteRepository.AddAsync(new()
            {
                Description = modelOrder.Description,
                Address = modelOrder.Address,
                OrderStatus = 1,
                Seller = seller,
                User = user,
                Product = product
            });

            await _orderWriteRepository.SaveAsync();
            return Ok("Order created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Order modelOrder)
        {
            Order order = await _orderReadRepository.GetByIdAsync(modelOrder.OrderId);
            if (order == null)
                return NotFound("Order does not exist.");

            if (modelOrder.Description != null)
                order.Description = modelOrder.Description;
            if (modelOrder.Address != null)
                order.Address = modelOrder.Address;
            if (modelOrder.OrderStatus != null)
                order.OrderStatus = (byte)modelOrder.OrderStatus;

            await _orderWriteRepository.SaveAsync();
            return Ok("Order updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _orderReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Order does not exist.");

            await _orderWriteRepository.RemoveAsync(id);
            await _orderWriteRepository.SaveAsync();
            return Ok("Order deleted.");
        }
    }
}
