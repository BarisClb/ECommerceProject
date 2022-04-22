using Infrastructure.Dtos.Request;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        readonly private LikeService _likeService;

        public LikesController(LikeService likeService)
        {
            _likeService = likeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _likeService.Get());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _likeService.Get(id));
        }

        [HttpGet("ByComment/{id}")]
        public async Task<IActionResult> ByComment(int id)
        {
            return Ok(await _likeService.ByComment(id));
        }

        [HttpGet("ByUser/{id}")]
        public async Task<IActionResult> ByUser(int id)
        {
            return Ok(await _likeService.ByUser(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(LikeCreateVm modelLike)
        {
            return Ok(await _likeService.Post(modelLike));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _likeService.Delete(id));
        }
    }
}
