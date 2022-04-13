using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentRepliesController : ControllerBase
    {
        readonly private ICommentReplyReadRepository _commentReplyReadRepository;
        readonly private ICommentReplyWriteRepository _commentReplyWriteRepository;

        readonly private ICommentReadRepository _commentReadRepository;
        readonly private IProductReadRepository _productReadRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        public CommentRepliesController(
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_commentReplyReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            CommentReply commentReply = await _commentReplyReadRepository.GetByIdAsync(id, false);
            if (commentReply == null)
                return NotFound("CommentReply does not exist.");

            return Ok(commentReply);
        }

        [HttpGet("ByComment/{id}")]
        public async Task<IActionResult> ByComment(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Comment does not exist.");

            return Ok(_commentReplyReadRepository.GetWhere(commentReply => commentReply.CommentId == id, false));
        }

        [HttpGet("ByProduct/{id}")]
        public async Task<IActionResult> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Product does not exist.");

            return Ok(_commentReplyReadRepository.GetWhere(commentReply => commentReply.ProductId == id, false));
        }

        [HttpGet("BySeller/{id}")]
        public async Task<IActionResult> BySeller(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Seller does not exist.");

            return Ok(_commentReplyReadRepository.GetWhere(commentReply => commentReply.SellerId == id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_CommentReply modelCommentReply)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelCommentReply.CommentId);
            if (comment == null)
                return NotFound("Comment does not exist.");

            Product product = await _productReadRepository.GetByIdAsync(modelCommentReply.ProductId);
            if (product == null)
                return NotFound("Product does not exist.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(modelCommentReply.SellerId);
            if (seller == null)
                return NotFound("Seller does not exist.");

            await _commentReplyWriteRepository.AddAsync(new()
            {
                Text = modelCommentReply.Text,
                Comment = comment,
                Product = product,
                Seller = seller
            });

            await _commentReplyWriteRepository.SaveAsync();
            return Ok("CommentReply created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_CommentReply modelCommentReply)
        {
            CommentReply commentReply = await _commentReplyReadRepository.GetByIdAsync(modelCommentReply.CommentReplyId);
            if (commentReply == null)
                return NotFound("CommentReply does not exist.");

            if (modelCommentReply.Text != null)
                commentReply.Text = modelCommentReply.Text;

            await _commentReplyWriteRepository.SaveAsync();
            return Ok("CommentReply updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _commentReplyReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("CommentReply does not exist.");

            await _commentReplyWriteRepository.RemoveAsync(id);
            await _commentReplyWriteRepository.SaveAsync();
            return Ok("CommentReply deleted.");
        }
    }
}
