using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        readonly private ILikeWriteRepository _likeWriteRepository;
        readonly private ILikeReadRepository _likeReadRepository;

        readonly private ICommentReadRepository _commentReadRepository;
        readonly private IUserReadRepository _userReadRepository;

        public LikesController(
            ILikeWriteRepository likeWriteRepository,
            ILikeReadRepository likeReadRepository,

            ICommentReadRepository commentReadRepository,
            IUserReadRepository userReadRepository)
        {
            _likeWriteRepository = likeWriteRepository;
            _likeReadRepository = likeReadRepository;

            _commentReadRepository = commentReadRepository;
            _userReadRepository = userReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_likeReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Like like = await _likeReadRepository.GetByIdAsync(id, false);
            if (like == null)
                return NotFound("Like does not exist.");

            return Ok(like);
        }

        [HttpGet("ByComment/{id}")]
        public async Task<IActionResult> ByComment(int id)
        {
            if (await _commentReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Comment does not exist.");

            return Ok(_likeReadRepository.GetWhere(like => like.CommentId == id, false));
        }

        [HttpGet("ByUser/{id}")]
        public async Task<IActionResult> ByUser(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("User does not exist.");

            return Ok(_likeReadRepository.GetWhere(like => like.UserId == id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Like modelLike)
        {
            Comment comment = await _commentReadRepository.GetByIdAsync(modelLike.CommentId);
            if (comment == null)
                return NotFound("Comment does not exist.");

            User user = await _userReadRepository.GetByIdAsync(modelLike.UserId);
            if (user == null)
                return NotFound("User does not exist.");

            await _likeWriteRepository.AddAsync(new()
            {
                User = user,
                Comment = comment
            });

            await _likeWriteRepository.SaveAsync();
            return Ok("Like created.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _likeReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Like does not exist.");

            await _likeWriteRepository.RemoveAsync(id);
            await _likeWriteRepository.SaveAsync();
            return Ok("Like deleted.");
        }

    }
}
