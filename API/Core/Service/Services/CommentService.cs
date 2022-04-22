using Application.Repositories;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
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

        public async Task<BaseResponse> Get()
        {
            IQueryable<Comment> comments = _commentReadRepository.GetAll(false);
            IQueryable<CommentReadVm> mappedComments = comments.Select(comment => new CommentReadVm
            {
                CommentId = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductId = comment.ProductId,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReadVm>>(mappedComments);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(id, false);
            if (comment == null)
                return new FailResponse("Comment does not exist.");

            CommentReadVm mappedComment = new()
            {
                CommentId = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductId = comment.ProductId,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            };

            return new SuccessfulResponse<CommentReadVm>(mappedComment);
        }

        public async Task<BaseResponse> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Product does not exist.");

            IQueryable<Comment> comments = _commentReadRepository.GetWhere(comment => comment.ProductId == id, false);
            IQueryable<CommentReadVm> mappedComments = comments.Select(comment => new CommentReadVm
            {
                CommentId = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductId = comment.ProductId,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReadVm>>(mappedComments);
        }

        public async Task<BaseResponse> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("User does not exist.");

            IQueryable<Comment> comments = _commentReadRepository.GetWhere(comment => comment.UserId == id, false);
            IQueryable<CommentReadVm> mappedComments = comments.Select(comment => new CommentReadVm
            {
                CommentId = comment.Id,
                Title = comment.Title,
                Text = comment.Text,
                Rating = comment.Rating,
                ProductId = comment.ProductId,
                DateCreated = comment.DateCreated,
                DateUpdated = comment.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReadVm>>(mappedComments);
        }

        public async Task<BaseResponse> Post(CommentCreateVm modelComment)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelComment.ProductId);
            if (product == null)
                return new FailResponse("Product does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelComment.UserId);
            if (user == null)
                return new FailResponse("User does not exist.");

            await _commentWriteRepository.AddAsync(new()
            {
                Title = modelComment.Title,
                Text = modelComment.Text,
                Rating = modelComment.Rating,
                Product = product,
                User = user
            });

            await _commentWriteRepository.SaveAsync();
            return new SuccessfulResponse<Comment>("Comment created.");
        }

        public async Task<BaseResponse> Put(CommentUpdateVm modelComment)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelComment.CommentId);
            if (comment == null)
                return new FailResponse("Comment does not exist.");

            if (modelComment.Title != null)
                comment.Title = modelComment.Title;
            if (modelComment.Text != null)
                comment.Text = modelComment.Text;
            if (modelComment.Rating != null)
                comment.Rating = (int)modelComment.Rating;

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
