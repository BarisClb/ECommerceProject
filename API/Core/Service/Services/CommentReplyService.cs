﻿using Application.Repositories;
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

        public async Task<BaseResponse> Get()
        {
            IQueryable<CommentReply> commentReplies = _commentReplyReadRepository.GetAll(false);
            IQueryable<CommentReplyReadVm> mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
            {
                CommentReplyId = commentReply.Id,
                CommentId = commentReply.CommentId,
                ProductId = commentReply.ProductId,
                SellerId = commentReply.SellerId,
                DateCreated = commentReply.DateCreated,
                DateUpdated = commentReply.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReplyReadVm>>(mappedCommentReplies);
        }

        public async Task<BaseResponse> Get(int id)
        {
            CommentReply commentReply = await _commentReplyReadRepository.GetByIdAsync(id, false);
            if (commentReply == null)
                return new FailResponse("CommentReply does not exist.");

            CommentReplyReadVm mappedCommentReply = new()
            {
                CommentReplyId = commentReply.Id,
                Text = commentReply.Text,
                DateCreated = commentReply.DateCreated,
                DateUpdated = commentReply.DateUpdated,
            };

            return new SuccessfulResponse<CommentReplyReadVm>(mappedCommentReply);
        }

        public async Task<BaseResponse> ByComment(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Comment does not exist.");

            IQueryable<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.CommentId == id, false);
            IQueryable<CommentReplyReadVm> mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
            {
                CommentReplyId = commentReply.Id,
                CommentId = commentReply.CommentId,
                ProductId = commentReply.ProductId,
                SellerId = commentReply.SellerId,
                DateCreated = commentReply.DateCreated,
                DateUpdated = commentReply.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReplyReadVm>>(mappedCommentReplies);
        }

        public async Task<BaseResponse> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Product does not exist.");

            IQueryable<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.ProductId == id, false);
            IQueryable<CommentReplyReadVm> mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
            {
                CommentReplyId = commentReply.Id,
                CommentId = commentReply.CommentId,
                ProductId = commentReply.ProductId,
                SellerId = commentReply.SellerId,
                DateCreated = commentReply.DateCreated,
                DateUpdated = commentReply.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReplyReadVm>>(mappedCommentReplies);
        }

        public async Task<BaseResponse> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            IQueryable<CommentReply> commentReplies = _commentReplyReadRepository.GetWhere(commentReply => commentReply.SellerId == id, false);
            IQueryable<CommentReplyReadVm> mappedCommentReplies = commentReplies.Select(commentReply => new CommentReplyReadVm
            {
                CommentReplyId = commentReply.Id,
                CommentId = commentReply.CommentId,
                ProductId = commentReply.ProductId,
                SellerId = commentReply.SellerId,
                DateCreated = commentReply.DateCreated,
                DateUpdated = commentReply.DateUpdated,
            });

            return new SuccessfulResponse<IQueryable<CommentReplyReadVm>>(mappedCommentReplies);
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

            await _commentReplyWriteRepository.AddAsync(new()
            {
                Text = modelCommentReply.Text,
                Comment = comment,
                Product = product,
                Seller = seller
            });

            await _commentReplyWriteRepository.SaveAsync();
            return new SuccessfulResponse<CommentReply>("CommentReply created.");
        }

        public async Task<BaseResponse> Put(CommentReplyUpdateVm modelCommentReply)
        {
            CommentReply commentReply = await _commentReplyReadRepository.GetByIdAsync(modelCommentReply.CommentReplyId);
            if (commentReply == null)
                return new FailResponse("CommentReply does not exist.");

            if (modelCommentReply.Text != null)
                commentReply.Text = modelCommentReply.Text;

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