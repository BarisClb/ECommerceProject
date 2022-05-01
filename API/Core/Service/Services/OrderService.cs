using Application.Repositories;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
using Infrastructure.Dtos.Common;
using Domain.Responses;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
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

        public async Task<SortedResponse<IList<OrderReadVm>, ListSortReadVm>> Get(ListSortWriteVm listSorting)
        {
            IList<Order> orders = _orderReadRepository.GetAll(false).ToList();
            IList<Order> orderedOrders;

            if (listSorting.Reverse)
            {
                orderedOrders = listSorting.OrderBy switch
                {
                    "UserUserame" => orders.OrderByDescending(o => o.UserUsername).ToList(),
                    "SellerUsername" => orders.OrderByDescending(o => o.SellerUsername).ToList(),
                    "OrderStatus" => orders.OrderByDescending(o => o.OrderStatus).ToList(),
                    _ => orders.Reverse().ToList(),
                };
            }
            else
            {
                orderedOrders = listSorting.OrderBy switch
                {
                    "UserUserame" => orders.OrderBy(o => o.UserUsername).ToList(),
                    "SellerUsername" => orders.OrderBy(o => o.SellerUsername).ToList(),
                    "OrderStatus" => orders.OrderBy(o => o.OrderStatus).ToList(),
                    _ => orders,
                };
            }

            IList<OrderReadVm> mappedOrders = orderedOrders.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(order => new OrderReadVm
            {
                Id = order.Id,
                Note = order.Note,
                Address = order.Address,
                Price = order.Price,
                Quantity = order.Quantity,
                Discount = order.Discount,
                Total = order.Total,
                OrderStatus = order.OrderStatus,
                ProductName = order.ProductName,
                ProductId = order.ProductId,
                SellerUsername = order.SellerUsername,
                SellerId = order.SellerId,
                UserUsername = order.UserUsername,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<OrderReadVm>, ListSortReadVm>(mappedOrders, new ListSortReadVm(listSorting.PageNumber, listSorting.PageSize, orders.Count, listSorting.Reverse, listSorting.OrderBy));
        }

        public async Task<BaseResponse> Get(int id)
        {
            Order order = await _orderReadRepository.GetByIdAsync(id, false);
            if (order == null)
                return new FailResponse("Order does not exist.");

            OrderReadVm mappedOrder = new()
            {
                Id = order.Id,
                Note = order.Note,
                Address = order.Address,
                Price = order.Price,
                Quantity = order.Quantity,
                Discount = order.Discount,
                Total = order.Total,
                OrderStatus = order.OrderStatus,
                ProductName = order.ProductName,
                ProductId = order.ProductId,
                SellerUsername = order.SellerUsername,
                SellerId = order.SellerId,
                UserUsername = order.UserUsername,
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

            IList<Order> orders = _orderReadRepository.GetWhere(order => order.ProductId == id, false).ToList();
            IList<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                Id = order.Id,
                Note = order.Note,
                Address = order.Address,
                Price = order.Price,
                Quantity = order.Quantity,
                Discount = order.Discount,
                Total = order.Total,
                OrderStatus = order.OrderStatus,
                ProductName = order.ProductName,
                ProductId = order.ProductId,
                SellerUsername = order.SellerUsername,
                SellerId = order.SellerId,
                UserUsername = order.UserUsername,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<OrderReadVm>>(mappedOrders);
        }

        public async Task<BaseResponse> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("User does not exist.");

            IList<Order> orders = _orderReadRepository.GetWhere(order => order.UserId == id, false).ToList();
            IList<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                Id = order.Id,
                Note = order.Note,
                Address = order.Address,
                Price = order.Price,
                Quantity = order.Quantity,
                Discount = order.Discount,
                Total = order.Total,
                OrderStatus = order.OrderStatus,
                ProductName = order.ProductName,
                ProductId = order.ProductId,
                SellerUsername = order.SellerUsername,
                SellerId = order.SellerId,
                UserUsername = order.UserUsername,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<OrderReadVm>>(mappedOrders);
        }

        public async Task<BaseResponse> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            IList<Order> orders = _orderReadRepository.GetWhere(order => order.SellerId == id, false).ToList();
            IList<OrderReadVm> mappedOrders = orders.Select(order => new OrderReadVm
            {
                Id = order.Id,
                Note = order.Note,
                Address = order.Address,
                Price = order.Price,
                Quantity = order.Quantity,
                Discount = order.Discount,
                Total = order.Total,
                OrderStatus = order.OrderStatus,
                ProductName = order.ProductName,
                ProductId = order.ProductId,
                SellerUsername = order.SellerUsername,
                SellerId = order.SellerId,
                UserUsername = order.UserUsername,
                UserId = order.UserId,
                DateCreated = order.DateCreated,
                DateUpdated = order.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<OrderReadVm>>(mappedOrders);
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

            decimal total = (modelOrder.Price * modelOrder.Quantity) / 100 * (100 - modelOrder.Discount);

            await _orderWriteRepository.AddAsync(new()
            {
                Note = modelOrder.Note,
                Address = modelOrder.Address,
                Price = modelOrder.Price,
                Quantity = modelOrder.Quantity,
                Discount = modelOrder.Discount,
                Total = total,
                OrderStatus = 1,
                ProductName = product.Name,
                Product = product,
                SellerUsername = seller.Username,
                Seller = seller,
                UserUsername = user.Username,
                User = user,
            });

            await _orderWriteRepository.SaveAsync();
            return new SuccessfulResponse<OrderReadVm>("Order created.");
        }

        public async Task<BaseResponse> Put(OrderUpdateVm modelOrder)
        {
            Order order = await _orderReadRepository.GetByIdAsync(modelOrder.Id);
            if (order == null)
                return new FailResponse("Order does not exist.");

            if (modelOrder.Note != null)
                order.Note = modelOrder.Note;
            if (modelOrder.Address != null)
                order.Address = modelOrder.Address;
            if (modelOrder.Price != null)
                order.Price = (decimal)modelOrder.Price;
            if (modelOrder.Quantity != null)
                order.Quantity = (int)modelOrder.Quantity;
            if (modelOrder.Discount != null)
                order.Discount = (int)modelOrder.Discount;
            if (modelOrder.Price != null || modelOrder.Quantity != null || modelOrder.Discount != null)
            {
                decimal total = (order.Price * order.Quantity) / 100 * (100 - order.Discount);
                order.Total = total;
            }
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
