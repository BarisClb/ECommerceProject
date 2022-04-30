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
    public class CommentService
    {
        readonly private ICommentWriteRepository _commentWriteRepository;
        readonly private ICommentReadRepository _commentReadRepository;

        readonly private IProductReadRepository _productReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public CommentService(
            ICommentWriteRepository commentWriteRepository,
            ICommentReadRepository commentReadRepository,

            IProductReadRepository productReadRepository,
            IUserReadRepository userReadRepository)
        {
            _commentWriteRepository = commentWriteRepository;
            _commentReadRepository = commentReadRepository;

            _productReadRepository = productReadRepository;
            _userReadRepository = userReadRepository;
        }

        public async Task<PagedResponse<IList<CommentReadVm>>> Get(Pagination pagination)
        {
            IList<Comment> comments = _commentReadRepository.GetAll(false).ToList();
            IList<CommentReadVm> mappedComments = comments.Skip((pagination.PageNumber - 1) * pagination.PageSize).Take(pagination.PageSize).Select(comment => new CommentReadVm
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

            return new PagedResponse<IList<CommentReadVm>>(mappedComments, comments.Count, pagination.PageNumber, pagination.PageSize);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(id, false);
            if (comment == null)
                return new FailResponse("Comment does not exist.");

            CommentReadVm mappedComment = new()
            {
                Id = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductName= comment.ProductName,
                ProductId = comment.ProductId,
                UserUsername = comment.UserUsername,
                UserId = comment.UserId,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            };

            return new SuccessfulResponse<CommentReadVm>(mappedComment);
        }

        public async Task<BaseResponse> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Product does not exist.");

            IList<Comment> comments = _commentReadRepository.GetWhere(comment => comment.ProductId == id, false).ToList();
            IList<CommentReadVm> mappedComments = comments.Select(comment => new CommentReadVm
            {
                Id = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductName = comment.ProductName,
                ProductId = comment.ProductId,
                UserId = comment.UserId,
                UserUsername = comment.UserUsername,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<CommentReadVm>>(mappedComments);
        }

        public async Task<BaseResponse> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("User does not exist.");

            IList<Comment> comments = _commentReadRepository.GetWhere(comment => comment.UserId == id, false).ToList();
            IList<CommentReadVm> mappedComments = comments.Select(comment => new CommentReadVm
            {
                Id = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductName= comment.ProductName,
                ProductId = comment.ProductId,
                UserId = comment.UserId,
                UserUsername = comment.UserUsername,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<CommentReadVm>>(mappedComments);
        }

        public async Task<BaseResponse> Post(CommentCreateVm modelComment)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelComment.ProductId);
            if (product == null)
                return new FailResponse("Product does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelComment.UserId);
            if (user == null)
                return new FailResponse("User does not exist.");

            if (modelComment.Rating > 5)
                modelComment.Rating = 5;

            await _commentWriteRepository.AddAsync(new()
            {
                Title = modelComment.Title,
                Text = modelComment.Text,
                Rating = modelComment.Rating,
                ProductName = product.Name,
                Product = product,
                UserUsername = user.Username,
                User = user
            });

            await _commentWriteRepository.SaveAsync();
            return new SuccessfulResponse<Comment>("Comment created.");
        }

        public async Task<BaseResponse> Put(CommentUpdateVm modelComment)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelComment.Id);
            if (comment == null)
                return new FailResponse("Comment does not exist.");

            if (modelComment.Title != null)
                comment.Title = modelComment.Title;
            if (modelComment.Text != null)
                comment.Text = modelComment.Text;
            if (modelComment.Rating != null)
                comment.Rating = (byte)modelComment.Rating;
            // This checks the rating even if the UpdatedRating is null (if they are updated).
            if (comment.Rating > 5)
                comment.Rating = 5;

            await _commentWriteRepository.SaveAsync();
            return new SuccessfulResponse<Comment>("Comment updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Comment does not exist.");

            await _commentWriteRepository.RemoveAsync(id);
            await _commentWriteRepository.SaveAsync();
            return new SuccessfulResponse<Comment>("Comment deleted.");
        }
    }
}
