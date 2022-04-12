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
            return Ok(await _likeReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Like modelLike)
        {

            Comment comment = await _commentReadRepository.GetByIdAsync(modelLike.CommentId);
            User user = await _userReadRepository.GetByIdAsync(modelLike.UserId);

            await _likeWriteRepository.AddAsync(new()
            {
                LikedBy = user,
                LikedComment = comment
            });

            await _likeWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _likeWriteRepository.RemoveAsync(id);
            await _likeWriteRepository.SaveAsync();
            return Ok();
        }

    }
}
