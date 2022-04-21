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
using Application.Dtos.Common;

namespace Application.Services
{
    public class ProductService
    {
        readonly private IProductWriteRepository _productWriteRepository;
        readonly private IProductReadRepository _productReadRepository;

        readonly private ICategoryReadRepository _categoryReadRepository;
        readonly private ICommentReadRepository _commentReadRepository;
        readonly private ICommentReplyReadRepository _commentReplyReadRepository;
        readonly private ILikeReadRepository _likeReadRepository;
        readonly private ISellerReadRepository _sellerReadRepository;


        public ProductService(
            IProductWriteRepository productWriteRepository,
            IProductReadRepository productReadRepository,

            ICategoryReadRepository categoryReadRepository,
            ICommentReadRepository commentReadRepository,
            ICommentReplyReadRepository commentReplyReadRepository,
            ILikeReadRepository likeReadRepository,
            ISellerReadRepository sellerReadRepository)

        {
            _productWriteRepository = productWriteRepository;
            _productReadRepository = productReadRepository;

            _categoryReadRepository = categoryReadRepository;
            _commentReadRepository = commentReadRepository;
            _commentReplyReadRepository = commentReplyReadRepository;
            _likeReadRepository = likeReadRepository;
            _sellerReadRepository = sellerReadRepository;
        }

        public async Task<BaseResponse> Get()
        {
            IQueryable<Product> products = _productReadRepository.GetAll(false);
            IQueryable<ProductReadVm> mappedProducts = products.Select(product => new ProductReadVm
            {
                ProductId = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<ProductReadVm>>(mappedProducts);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Product product = await _productReadRepository.GetByIdAsync(id, false);
            if (product == null)
                return new FailResponse("Product does not exist.");

            ProductReadVm mappedProduct = new()
            {
                ProductId = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            };

            return new SuccessfulResponse<ProductReadVm>(mappedProduct);
        }

        public async Task<BaseResponse> ByCategory(int id)
        {
            if (await _categoryReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Category does not exist.");

            IQueryable<Product> products = _productReadRepository.GetWhere(product => product.CategoryId == id, false);
            IQueryable<ProductReadVm> mappedProducts = products.Select(product => new ProductReadVm
            {
                ProductId = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<ProductReadVm>>(mappedProducts);
        }

        public async Task<BaseResponse> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            IQueryable<Product> products = _productReadRepository.GetWhere(product => product.SellerId == id, false);
            IQueryable<ProductReadVm> mappedProducts = products.Select(product => new ProductReadVm
            {
                ProductId = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<ProductReadVm>>(mappedProducts);
        }

        public async Task<BaseResponse> GetProductPage(int id)
        {
            Product product = await _productReadRepository.GetByIdAsync(id);
            if (product == null)
                return new FailResponse("Product does not exist.");
            Seller seller = await _sellerReadRepository.GetByIdAsync(product.SellerId);
            if (seller == null)
                return new FailResponse("Seller does not exist.");
            IQueryable<Comment> comments = _commentReadRepository.GetWhere(comment => comment.ProductId == id);
            IQueryable<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.ProductId == id);
            IQueryable<Like> likes = _likeReadRepository.GetWhere(like => like.ProductId == id);

            ProductReadVm mappedProduct = new()
            {
                ProductId = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            };

            SellerReadVm mappedSeller = new()
            {
                SellerId = seller.Id,
                Name = seller.Name,
                Username = seller.Username,
                EMail = seller.EMail,
                Password = seller.Password,
                DateCreated = seller.DateCreated,
                DateUpdated = seller.DateUpdated,
            };

            IQueryable<CommentReadVm> mappedComments = null;
            if (comments != null)
            {
                mappedComments = comments.Select(comment => new CommentReadVm
                {
                    CommentId = comment.Id,
                    Title = comment.Title,
                    Text = comment.Text,
                    Rating = comment.Rating,
                    ProductId = comment.ProductId,
                    DateCreated = comment.DateCreated,
                    DateUpdated = comment.DateUpdated,
                });
            }

            IQueryable<CommentReplyReadVm> mappedCommentReplies = null;
            if (commentReplies != null)
            {
                mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
                {
                    CommentReplyId = commentReply.Id,
                    CommentId = commentReply.CommentId,
                    ProductId = commentReply.ProductId,
                    SellerId = commentReply.SellerId,
                    DateCreated = commentReply.DateCreated,
                    DateUpdated = commentReply.DateUpdated,
                });
            }

            IQueryable<LikeReadVm> mappedLikes = null;
            if (likes != null)
            {
                mappedLikes = likes.Select(like => new LikeReadVm
                {
                    LikeId = like.Id,
                    CommentId = like.CommentId,
                    ProductId = like.ProductId,
                    UserId = like.UserId,
                    DateCreated = like.DateCreated,
                    DateUpdated = like.DateUpdated,
                });
            } 

            ProductPageReadVm data = new()
            {
                Product = mappedProduct,
                Seller = mappedSeller,
                Comments = mappedComments,
                CommentReplies = mappedCommentReplies,
                Likes = mappedLikes,
            };

            return new SuccessfulResponse<ProductPageReadVm>(data);
        }

        public async Task<BaseResponse> Post(ProductCreateVm modelProduct)
        {
            Category category = await _categoryReadRepository.GetByIdAsync(modelProduct.CategoryId);
            if (category == null)
                return new FailResponse("Category does not exist.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(modelProduct.SellerId);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

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
            return new SuccessfulResponse<Product>("Product created.");
        }

        public async Task<BaseResponse> Put(ProductUpdateVm modelProduct)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelProduct.ProductId);
            if (product == null)
                return new FailResponse("Product does not exist.");

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
            return new SuccessfulResponse<Product>("Product updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Product does not exist.");

            await _productWriteRepository.RemoveAsync(id);
            await _productWriteRepository.SaveAsync();
            return new SuccessfulResponse<Product>("Product deleted.");
        }
    }
}
