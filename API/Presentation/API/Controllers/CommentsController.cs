using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        readonly private ICommentWriteRepository _commentWriteRepository;
        readonly private ICommentReadRepository _commentReadRepository;

        readonly private IProductReadRepository _productReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public CommentsController(
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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_commentReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(id, false);
            if (comment == null)
                return NotFound("Comment does not exist.");

            return Ok(comment);
        }

        [HttpGet("ByProduct/{id}")]
        public async Task<IActionResult> ByProduct(int id)
        {
            if (await _productReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Product does not exist.");

            return Ok(_commentReadRepository.GetWhere(comment => comment.ProductId == id, false));
        }

        [HttpGet("ByUser/{id}")]
        public async Task<IActionResult> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("User does not exist.");

            return Ok(_commentReadRepository.GetWhere(comment => comment.UserId == id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(CommentCreateVm modelComment)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelComment.ProductId);
            if (product == null)
                return NotFound("Product does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelComment.UserId);
            if (user == null)
                return NotFound("User does not exist.");

            await _commentWriteRepository.AddAsync(new()
            {
                Title = modelComment.Title,
                Text = modelComment.Text,
                Rating = modelComment.Rating,
                Product = product,
                User = user
            });

            await _commentWriteRepository.SaveAsync();
            return Ok("Comment created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(CommentUpdateVm modelComment)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelComment.CommentId);
            if (comment == null)
                return NotFound("Comment does not exist.");

            if (modelComment.Title != null)
                comment.Title = modelComment.Title;
            if (modelComment.Text != null)
                comment.Text = modelComment.Text;
            if (modelComment.Rating != null)
                comment.Rating = (int)modelComment.Rating;

            await _commentWriteRepository.SaveAsync();
            return Ok("Comment updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Comment does not exist.");

            await _commentWriteRepository.RemoveAsync(id);
            await _commentWriteRepository.SaveAsync();
            return Ok("Comment deleted.");
        }
    }
}
