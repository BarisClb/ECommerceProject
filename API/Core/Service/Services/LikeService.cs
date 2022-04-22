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
    public class LikeService
    {
        readonly private ILikeWriteRepository _likeWriteRepository;
        readonly private ILikeReadRepository _likeReadRepository;

        readonly private ICommentReadRepository _commentReadRepository;
        readonly private IProductReadRepository _productReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public LikeService(
            ILikeWriteRepository likeWriteRepository,
            ILikeReadRepository likeReadRepository,

            ICommentReadRepository commentReadRepository,
            IProductReadRepository productReadRepository,
            IUserReadRepository userReadRepository)
        {
            _likeWriteRepository = likeWriteRepository;
            _likeReadRepository = likeReadRepository;

            _commentReadRepository = commentReadRepository;
            _productReadRepository = productReadRepository;
            _userReadRepository = userReadRepository;
        }

        public async Task<SuccessfulResponse<IList<LikeReadVm>>> Get()
        {
            IList<Like> likes = _likeReadRepository.GetAll(false).ToList();
            IList<LikeReadVm> mappedLikes = likes.Select(like => new LikeReadVm
            {
                Id = like.Id,
                CommentId = like.CommentId,
                ProductId = like.ProductId,
                UserId = like.UserId,
                DateCreated = like.DateCreated,
                DateUpdated = like.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<LikeReadVm>>(mappedLikes);
        }

        public async Task<BaseResponse> Get(int id)
        {
            Like like = await _likeReadRepository.GetByIdAsync(id, false);
            if (like == null)
                return new FailResponse("Like does not exist.");

            LikeReadVm mappedLike = new()
            {
                Id = like.Id,
                CommentId = like.CommentId,
                ProductId = like.ProductId,
                UserId = like.UserId,
                DateCreated = like.DateCreated,
                DateUpdated = like.DateUpdated,
            };

            return new SuccessfulResponse<LikeReadVm>(mappedLike);
        }

        public async Task<BaseResponse> ByComment(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Comment does not exist.");

            IList<Like> likes = _likeReadRepository.GetWhere(like => like.CommentId == id, false).ToList();
            IList<LikeReadVm> mappedLikes = likes.Select(like => new LikeReadVm
            {
                Id = like.Id,
                CommentId = like.CommentId,
                ProductId = like.ProductId,
                UserId = like.UserId,
                DateCreated = like.DateCreated,
                DateUpdated = like.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<LikeReadVm>>(mappedLikes);
        }

        public async Task<BaseResponse> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("User does not exist.");

            IList<Like> likes = _likeReadRepository.GetWhere(like => like.UserId == id, false).ToList();
            IList<LikeReadVm> mappedLikes = likes.Select(like => new LikeReadVm
            {
                Id = like.Id,
                CommentId = like.CommentId,
                ProductId = like.ProductId,
                UserId = like.UserId,
                DateCreated = like.DateCreated,
                DateUpdated = like.DateUpdated,
            }).ToList();

            return new SuccessfulResponse<IList<LikeReadVm>>(mappedLikes);
        }

        public async Task<BaseResponse> Post(LikeCreateVm modelLike)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelLike.CommentId);
            if (comment == null)
                return new FailResponse("Comment does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelLike.UserId);
            if (user == null)
                return new FailResponse("User does not exist.");

            Product product = await _productReadRepository.GetByIdAsync(modelLike.ProductId);
            if (product == null)
                return new FailResponse("Product does not exist.");

            await _likeWriteRepository.AddAsync(new()
            {
                User = user,
                Comment = comment,
                Product = product,
            });

            await _likeWriteRepository.SaveAsync();
            return new SuccessfulResponse<LikeReadVm>("Like created.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _likeReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Like does not exist.");

            await _likeWriteRepository.RemoveAsync(id);
            await _likeWriteRepository.SaveAsync();
            return new SuccessfulResponse<LikeReadVm>("Like deleted.");
        }
    }
}
