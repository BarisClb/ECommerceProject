using Application.Repositories;
using Application.Utilities.Validators;
using Domain.Entities;
using Domain.Responses;
using Infrastructure.Dtos.Common;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
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

        public async Task<SortedResponse<IList<ProductReadVm>, ListSortReadVm>> Get(ListSortWriteVm listSorting)
        {
            // Search Word
            IList<Product> products;
            if (!string.IsNullOrWhiteSpace(listSorting.SearchWord))
            {
                products = _productReadRepository.GetWhere(p => p.Name.Contains(listSorting.SearchWord)).ToList();
            }
            else
            {
                products = _productReadRepository.GetAll(false).ToList();
            }
            // Sort => Reversed? OrderBy?
            IList<Product> orderedProducts;
            if (listSorting.Reversed)
            {
                orderedProducts = listSorting.OrderBy switch
                {
                    "Name" => products.OrderByDescending(p => p.Name).ToList(),
                    "Price" => products.OrderByDescending(p => p.Price).ToList(),
                    "CategoryName" => products.OrderByDescending(p => p.CategoryName).ToList(),
                    "SellerUsername" => products.OrderByDescending(p => p.SellerUsername).ToList(),
                    // "LikesCount" => products.OrderByDescending(p => p.Likes.Count).ToList(),
                    _ => products.Reverse().ToList(),
                };
            }
            else
            {
                orderedProducts = listSorting.OrderBy switch
                {
                    "Name" => products.OrderBy(p => p.Name).ToList(),
                    "Price" => products.OrderBy(p => p.Price).ToList(),
                    "CategoryName" => products.OrderBy(p => p.CategoryName).ToList(),
                    "SellerUsername" => products.OrderBy(p => p.SellerUsername).ToList(),
                    // "LikesCount" => products.OrderBy(p => p.Likes.Count).ToList(),
                    _ => products,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = products.Count;

            IList<ProductReadVm> mappedProducts = orderedProducts.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(product => new ProductReadVm
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryName = product.CategoryName,
                CategoryId = product.CategoryId,
                SellerUsername = product.SellerUsername,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<ProductReadVm>, ListSortReadVm>(mappedProducts, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, products.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> Get(int id)
        {
            Product product = await _productReadRepository.GetByIdAsync(id, false);
            if (product == null)
                return new FailResponse("Product does not exist.");
            // I can get EntityName (in a One-to-Many relationship) this way, but how to get it in a List as above?)
            // Category category = await _categoryReadRepository.GetByIdAsync(product.CategoryId, false);
            // Seller seller = await _sellerReadRepository.GetByIdAsync(product.SellerId, false);

            ProductReadVm mappedProduct = new()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryName = product.CategoryName,
                CategoryId = product.CategoryId,
                SellerUsername = product.SellerUsername,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            };

            return new SuccessfulResponse<ProductReadVm>(mappedProduct);
        }

        public async Task<BaseResponse> ByCategory(int id, ListSortWriteVm listSorting)
        {
            if (await _categoryReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Category does not exist.");

            IList<Product> products = _productReadRepository.GetWhere(product => product.CategoryId == id, false).ToList();
            if (!string.IsNullOrWhiteSpace(listSorting.SearchWord))
            {
                products = products.Where(p => p.Name.Contains(listSorting.SearchWord)).ToList();
            }
            // Sort => Reversed? OrderBy?
            IList<Product> orderedProducts;
            if (listSorting.Reversed)
            {
                orderedProducts = listSorting.OrderBy switch
                {
                    "Name" => products.OrderByDescending(p => p.Name).ToList(),
                    "Price" => products.OrderByDescending(p => p.Price).ToList(),
                    "CategoryName" => products.OrderByDescending(p => p.CategoryName).ToList(),
                    "SellerUsername" => products.OrderByDescending(p => p.SellerUsername).ToList(),
                    // "LikesCount" => products.OrderByDescending(p => p.Likes.Count).ToList(),
                    _ => products.Reverse().ToList(),
                };
            }
            else
            {
                orderedProducts = listSorting.OrderBy switch
                {
                    "Name" => products.OrderBy(p => p.Name).ToList(),
                    "Price" => products.OrderBy(p => p.Price).ToList(),
                    "CategoryName" => products.OrderBy(p => p.CategoryName).ToList(),
                    "SellerUsername" => products.OrderBy(p => p.SellerUsername).ToList(),
                    // "LikesCount" => products.OrderBy(p => p.Likes.Count).ToList(),
                    _ => products,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = products.Count;

            IList<ProductReadVm> mappedProducts = orderedProducts.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(product => new ProductReadVm
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryName = product.CategoryName,
                CategoryId = product.CategoryId,
                SellerUsername = product.SellerUsername,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<ProductReadVm>, ListSortReadVm>(mappedProducts, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, products.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> BySeller(int id, ListSortWriteVm listSorting)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            IList<Product> products = _productReadRepository.GetWhere(product => product.SellerId == id, false).ToList();
            if (!string.IsNullOrWhiteSpace(listSorting.SearchWord))
            {
                products = products.Where(p => p.Name.Contains(listSorting.SearchWord)).ToList();
            }
            // Sort => Reversed? OrderBy?
            IList<Product> orderedProducts;
            if (listSorting.Reversed)
            {
                orderedProducts = listSorting.OrderBy switch
                {
                    "Name" => products.OrderByDescending(p => p.Name).ToList(),
                    "Price" => products.OrderByDescending(p => p.Price).ToList(),
                    "CategoryName" => products.OrderByDescending(p => p.CategoryName).ToList(),
                    "SellerUsername" => products.OrderByDescending(p => p.SellerUsername).ToList(),
                    // "LikesCount" => products.OrderByDescending(p => p.Likes.Count).ToList(),
                    _ => products.Reverse().ToList(),
                };
            }
            else
            {
                orderedProducts = listSorting.OrderBy switch
                {
                    "Name" => products.OrderBy(p => p.Name).ToList(),
                    "Price" => products.OrderBy(p => p.Price).ToList(),
                    "CategoryName" => products.OrderBy(p => p.CategoryName).ToList(),
                    "SellerUsername" => products.OrderBy(p => p.SellerUsername).ToList(),
                    // "LikesCount" => products.OrderBy(p => p.Likes.Count).ToList(),
                    _ => products,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = products.Count;

            IList<ProductReadVm> mappedProducts = orderedProducts.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(product => new ProductReadVm
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                CategoryName = product.CategoryName,
                CategoryId = product.CategoryId,
                SellerUsername = product.SellerUsername,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<ProductReadVm>, ListSortReadVm>(mappedProducts, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, products.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> GetProductPage(int id)
        {
            Product product = await _productReadRepository.GetByIdAsync(id);
            if (product == null)
                return new FailResponse("Product does not exist.");
            Seller seller = await _sellerReadRepository.GetByIdAsync(product.SellerId);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

            IList<Comment> comments = _commentReadRepository.GetWhere(comment => comment.ProductId == id).ToList();
            IList<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.ProductId == id).ToList();
            IList<Like> likes = _likeReadRepository.GetWhere(like => like.ProductId == id).ToList();

            int totalRating = 0;
            int totalComments = comments.Count();
            decimal avarageRating = 0;

            if (totalComments > 0)
            {
                foreach (Comment comment in comments)
                {
                    totalRating += comment.Rating;
                }
                avarageRating = Decimal.Divide(totalRating, totalComments);
            }

            ProductReadVm mappedProduct = new()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Stock = product.Stock,
                AvarageRating = avarageRating,
                CategoryName = product.CategoryName,
                CategoryId = product.CategoryId,
                SellerUsername = product.SellerUsername,
                SellerId = product.SellerId,
                DateCreated = product.DateCreated,
                DateUpdated = product.DateUpdated,
            };

            SellerReadVm mappedSeller = new()
            {
                Id = seller.Id,
                Name = seller.Name,
                Username = seller.Username,
                EMail = seller.EMail,
                Password = seller.Password,
                DateCreated = seller.DateCreated,
                DateUpdated = seller.DateUpdated,
            };

            IList<CommentReadVm>? mappedComments = null;
            if (comments != null)
            {
                mappedComments = comments.Select(comment => new CommentReadVm
                {
                    Id = comment.Id,
                    Title = comment.Title,
                    Text = comment.Text,
                    Rating = comment.Rating,
                    ProductName = comment.ProductName,
                    ProductId = comment.ProductId,
                    UserUsername = comment.UserUsername,
                    UserId = comment.UserId,
                    DateCreated = comment.DateCreated,
                    DateUpdated = comment.DateUpdated,
                }).ToList();
            }

            IList<CommentReplyReadVm>? mappedCommentReplies = null;
            if (commentReplies != null)
            {
                mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
                {
                    Id = commentReply.Id,
                    Text = commentReply.Text,
                    CommentId = commentReply.CommentId,
                    ProductName = commentReply.ProductName,
                    ProductId = commentReply.ProductId,
                    SellerUsername = commentReply.SellerUsername,
                    SellerId = commentReply.SellerId,
                    DateCreated = commentReply.DateCreated,
                    DateUpdated = commentReply.DateUpdated,
                }).ToList();
            }

            IList<LikeReadVm>? mappedLikes = null;
            if (likes != null)
            {
                mappedLikes = likes.Select(like => new LikeReadVm
                {
                    Id = like.Id,
                    CommentId = like.CommentId,
                    ProductName = like.ProductName,
                    ProductId = like.ProductId,
                    UserUsername = like.UserUsername,
                    UserId = like.UserId,
                    DateCreated = like.DateCreated,
                    DateUpdated = like.DateUpdated,
                }).ToList();
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

            // Checking if the Information is Empty
            if (String.IsNullOrWhiteSpace(modelProduct.Name))
                return new FailResponse("Invalid Name.");
            if (String.IsNullOrWhiteSpace(modelProduct.Description))
                return new FailResponse("Invalid Description.");

            // Trim and Replace Multiple Whitespaces
            modelProduct.Name = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelProduct.Name);
            modelProduct.Description = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelProduct.Description);

            if (modelProduct.Price < 0)
                modelProduct.Price = 0;

            await _productWriteRepository.AddAsync(new()
            {
                Name = modelProduct.Name,
                Description = modelProduct.Description,
                Price = modelProduct.Price,
                Stock = modelProduct.Stock,
                CategoryName = category.Name,
                Category = category,
                SellerUsername = seller.Username,
                Seller = seller
            });

            await _productWriteRepository.SaveAsync();
            return new SuccessfulResponse<Product>("Product created.");
        }

        public async Task<BaseResponse> Put(ProductUpdateVm modelProduct)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelProduct.Id);
            if (product == null)
                return new FailResponse("Product does not exist.");

            if (modelProduct.Name != null)
            {
                product.Name = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelProduct.Name);
                if (modelProduct.Name == "")
                    return new FailResponse("Invalid Name.");

                product.Name = modelProduct.Name;
            }
            if (modelProduct.Description != null)
            {
                modelProduct.Description = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelProduct.Description);
                if (modelProduct.Description == "")
                    return new FailResponse("Invalid Description.");

                product.Description = modelProduct.Description;
            }
            if (modelProduct.Price != null)
                product.Price = (decimal)modelProduct.Price;
            if (modelProduct.Stock != null)
                product.Stock = (int)modelProduct.Stock;
            if (modelProduct.CategoryId != null)
            {
                int categoryId = (int)modelProduct.CategoryId;
                Category category = await _categoryReadRepository.GetByIdAsync(categoryId);
                product.Category = category;
                product.CategoryName = category.Name;
            }
            if (modelProduct.SellerId != null)
            {
                int sellerId = (int)modelProduct.SellerId;
                Seller seller = await _sellerReadRepository.GetByIdAsync(sellerId);
                product.Seller = seller;
                product.SellerUsername = seller.Username;
            }

            // I put this here so that it checks the rating even if the modelComment.Rating is null (even if it's not updated manualy).
            if (modelProduct.Price < 0)
                modelProduct.Price = 0;

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
