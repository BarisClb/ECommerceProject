using Application.Repositories;
using Application.Responses;
using Application.Dtos.Request;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Dtos.Response;

namespace Application.Services
{
    public class OrderService
    {
        readonly private IOrderWriteRepository _orderWriteRepository;
        readonly private IOrderReadRepository _orderReadRepository;

        readonly private IProductReadRepository _productReadRepository;
        readonly private ISellerReadRepository _sellerReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public OrderService(
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

        public async Task<BaseResponse> Get()
        {
            IQueryable<Order> orders = _orderReadRepository.GetAll(false);
            IQueryable<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                OrderId = order.Id,
                Description = order.Description,
                Address = order.Address,
                OrderStatus = order.OrderStatus,
                ProductId = order.ProductId,
                SellerId = order.SellerId,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<OrderReadVm>>(mappedOrders);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Order order = await _orderReadRepository.GetByIdAsync(id, false);
            if (order == null)
                return new FailResponse("Order does not exist.");

            OrderReadVm mappedOrder = new()
            {
                OrderId = order.Id,
                Description = order.Description,
                Address = order.Address,
                OrderStatus = order.OrderStatus,
                ProductId = order.ProductId,
                SellerId = order.SellerId,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            };

            return new SuccessfulResponse<OrderReadVm>(mappedOrder);
        }

        public async Task<BaseResponse> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Product does not exist.");

            IQueryable<Order> orders = _orderReadRepository.GetWhere(order => order.ProductId == id, false);
            IQueryable<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                OrderId = order.Id,
                Description = order.Description,
                Address = order.Address,
                OrderStatus = order.OrderStatus,
                ProductId = order.ProductId,
                SellerId = order.SellerId,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<OrderReadVm>>(mappedOrders);
        }

        public async Task<BaseResponse> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("User does not exist.");

            IQueryable<Order> orders = _orderReadRepository.GetWhere(order => order.UserId == id, false);
            IQueryable<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                OrderId = order.Id,
                Description = order.Description,
                Address = order.Address,
                OrderStatus = order.OrderStatus,
                ProductId = order.ProductId,
                SellerId = order.SellerId,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<OrderReadVm>>(mappedOrders);
        }

        public async Task<BaseResponse> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            IQueryable<Order> orders = _orderReadRepository.GetWhere(order => order.SellerId == id, false);
            IQueryable<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                OrderId = order.Id,
                Description = order.Description,
                Address = order.Address,
                OrderStatus = order.OrderStatus,
                ProductId = order.ProductId,
                SellerId = order.SellerId,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<OrderReadVm>>(mappedOrders);
        }

        public async Task<BaseResponse> Post(OrderCreateVm modelOrder)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelOrder.ProductId);
            if (product == null)
                return new FailResponse("Product does not exist.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(product.SellerId);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelOrder.UserId);
            if (user == null)
                return new FailResponse("User does not exist.");

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
            return new SuccessfulResponse<OrderReadVm>("Order created.");
        }

        public async Task<BaseResponse> Put(OrderUpdateVm modelOrder)
        {
            Order order = await _orderReadRepository.GetByIdAsync(modelOrder.OrderId);
            if (order == null)
                return new FailResponse("Order does not exist.");

            if (modelOrder.Description != null)
                order.Description = modelOrder.Description;
            if (modelOrder.Address != null)
                order.Address = modelOrder.Address;
            if (modelOrder.OrderStatus != null)
                order.OrderStatus = (byte)modelOrder.OrderStatus;

            await _orderWriteRepository.SaveAsync();
            return new SuccessfulResponse<OrderReadVm>("Order updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _orderReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Order does not exist.");

            await _orderWriteRepository.RemoveAsync(id);
            await _orderWriteRepository.SaveAsync();
            return new SuccessfulResponse<OrderReadVm>("Order deleted.");
        }
    }
}
