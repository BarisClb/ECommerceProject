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

            _userReadRepository = userReadRepository;
            _productReadRepository = productReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_commentReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _commentReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Comment modelComment)
        {
            Product product = await _productReadRepository.GetByIdAsync(modelComment.ProductId);
            User user = await _userReadRepository.GetByIdAsync(modelComment.UserId);

            await _commentWriteRepository.AddAsync(new()
            {
                Title = modelComment.Title,
                Text = modelComment.Text,
                Rating = modelComment.Rating,
                CommentedTo = product,
                WrittenBy = user
            });

            await _commentWriteRepository.SaveAsync()
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Comment modelComment)
        {
            Comment category = await _commentReadRepository.GetByIdAsync(modelComment.CommentId);

            if (modelComment.Title != null)
                category.Title = modelComment.Title;
            if (modelComment.Text != null)
                category.Text = modelComment.Text;
            if (modelComment.Rating != null)
                category.Rating = (int)modelComment.Rating;

            await _commentWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _commentWriteRepository.RemoveAsync(id);
            await _commentWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
