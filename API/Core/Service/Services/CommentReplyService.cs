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
    public class CommentReplyService
    {
        readonly private ICommentReplyReadRepository _commentReplyReadRepository;
        readonly private ICommentReplyWriteRepository _commentReplyWriteRepository;

        readonly private ICommentReadRepository _commentReadRepository;
        readonly private IProductReadRepository _productReadRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        public CommentReplyService(
            ICommentReplyReadRepository commentReplyReadRepository,
            ICommentReplyWriteRepository commentReplyWriteRepository,

            ICommentReadRepository commentReadRepository,
            IProductReadRepository productReadRepository,
            ISellerReadRepository sellerReadRepository)
        {
            _commentReplyWriteRepository = commentReplyWriteRepository;
            _commentReplyReadRepository = commentReplyReadRepository;

            _commentReadRepository = commentReadRepository;
            _productReadRepository = productReadRepository;
            _sellerReadRepository = sellerReadRepository;
        }

        public async Task<SortedResponse<IList<CommentReplyReadVm>, ListSortReadVm>> Get(ListSortWriteVm listSorting)
        {
            IList<CommentReply> commentReplies = _commentReplyReadRepository.GetAll(false).ToList();
            // Sort => Reverse? OrderBy?
            IList<CommentReply> orderedCommentReplies;
            if (listSorting.Reversed)
            {
                orderedCommentReplies = listSorting.OrderBy switch
                {
                    _ => commentReplies.Reverse().ToList(),
                };
            }
            else
            {
                orderedCommentReplies = listSorting.OrderBy switch
                {
                    _ => commentReplies,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = commentReplies.Count;

            IList<CommentReplyReadVm> mappedCommentReplies = orderedCommentReplies.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(commentReply => new CommentReplyReadVm
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

            return new SortedResponse<IList<CommentReplyReadVm>, ListSortReadVm>(mappedCommentReplies, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, commentReplies.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> Get(int id)
        {
            CommentReply commentReply = await _commentReplyReadRepository.GetByIdAsync(id, false);
            if (commentReply == null)
                return new FailResponse("CommentReply does not exist.");

            CommentReplyReadVm mappedCommentReply = new()
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
            };

            return new SuccessfulResponse<CommentReplyReadVm>(mappedCommentReply);
        }

        public async Task<BaseResponse> ByComment(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Comment does not exist.");

            IList<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.CommentId == id, false).ToList();
            IList<CommentReplyReadVm> mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
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

            return new SuccessfulResponse<IList<CommentReplyReadVm>>(mappedCommentReplies);
        }

        public async Task<BaseResponse> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Product does not exist.");

            IList<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.ProductId == id, false).ToList();
            IList<CommentReplyReadVm> mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
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

            return new SuccessfulResponse<IList<CommentReplyReadVm>>(mappedCommentReplies);
        }

        public async Task<BaseResponse> BySeller(int id, ListSortWriteVm listSorting)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            IList<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.SellerId == id, false).ToList();
            // Sort => Reverse? OrderBy?
            IList<CommentReply> orderedCommentReplies;
            if (listSorting.Reversed)
            {
                orderedCommentReplies = listSorting.OrderBy switch
                {
                    "SellerUsername" => commentReplies.OrderByDescending(c => c.SellerUsername).ToList(),
                    "ProductName" => commentReplies.OrderByDescending(c => c.ProductName).ToList(),
                    _ => commentReplies.Reverse().ToList(),
                };
            }
            else
            {
                orderedCommentReplies = listSorting.OrderBy switch
                {
                    "SellerUsername" => commentReplies.OrderBy(c => c.SellerUsername).ToList(),
                    "ProductName" => commentReplies.OrderBy(c => c.ProductName).ToList(),
                    _ => commentReplies,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = commentReplies.Count;

            IList<CommentReplyReadVm> mappedCommentReplies = orderedCommentReplies.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(commentReply => new CommentReplyReadVm
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

            return new SortedResponse<IList<CommentReplyReadVm>, ListSortReadVm>(mappedCommentReplies, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, commentReplies.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> Post(CommentReplyCreateVm modelCommentReply)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelCommentReply.CommentId);
            if (comment == null)
                return new FailResponse("Comment does not exist.");

            Product product = await _productReadRepository.GetByIdAsync(modelCommentReply.ProductId);
            if (product == null)
                return new FailResponse("Product does not exist.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(modelCommentReply.SellerId);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

            // Trim and Replace Multiple Whitespaces
            modelCommentReply.Text = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelCommentReply.Text);

            await _commentReplyWriteRepository.AddAsync(new()
            {
                Text = modelCommentReply.Text,
                Comment = comment,
                ProductName = product.Name,
                Product = product,
                SellerUsername = seller.Username,
                Seller = seller
            });

            await _commentReplyWriteRepository.SaveAsync();
            return new SuccessfulResponse<CommentReply>("CommentReply created.");
        }

        public async Task<BaseResponse> Put(CommentReplyUpdateVm modelCommentReply)
        {
            CommentReply commentReply = await _commentReplyReadRepository.GetByIdAsync(modelCommentReply.Id);
            if (commentReply == null)
                return new FailResponse("CommentReply does not exist.");

            if (modelCommentReply.Text != null)
            {
                modelCommentReply.Text = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelCommentReply.Text);
                commentReply.Text = modelCommentReply.Text;
            }

            await _commentReplyWriteRepository.SaveAsync();
            return new SuccessfulResponse<CommentReply>("CommentReply updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _commentReplyReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("CommentReply does not exist.");

            await _commentReplyWriteRepository.RemoveAsync(id);
            await _commentReplyWriteRepository.SaveAsync();
            return new SuccessfulResponse<CommentReply>("CommentReply deleted.");
        }
    }
}
