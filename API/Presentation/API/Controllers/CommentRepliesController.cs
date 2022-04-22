using Infrastructure.Dtos.Request;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentRepliesController : ControllerBase
    {
        readonly private CommentReplyService _commentReplyService;

        public CommentRepliesController(CommentReplyService commentReplyService)
        {
            _commentReplyService = commentReplyService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _commentReplyService.Get());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _commentReplyService.Get(id));
        }

        [HttpGet("ByComment/{id}")]
        public async Task<IActionResult> ByComment(int id)
        {
            return Ok(await _commentReplyService.ByComment(id));
        }

        [HttpGet("ByProduct/{id}")]
        public async Task<IActionResult> ByProduct(int id)
        {
            return Ok(await _commentReplyService.ByProduct(id));
        }

        [HttpGet("BySeller/{id}")]
        public async Task<IActionResult> BySeller(int id)
        {
            return Ok(await _commentReplyService.BySeller(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(CommentReplyCreateVm modelCommentReply)
        {
            return Ok(await _commentReplyService.Post(modelCommentReply));
        }

        [HttpPut]
        public async Task<IActionResult> Put(CommentReplyUpdateVm modelCommentReply)
        {
            return Ok(await _commentReplyService.Put(modelCommentReply));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _commentReplyService.Delete(id));
        }
    }
}
