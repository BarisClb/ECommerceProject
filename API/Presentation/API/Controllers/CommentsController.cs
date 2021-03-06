using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Common;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        readonly private CommentService _commentService;

        public CommentsController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ListSortWriteVm listSorting)
        {
            return Ok(await _commentService.Get(listSorting));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _commentService.Get(id));
        }

        [HttpGet("ByProduct/{id}")]
        public async Task<IActionResult> ByProduct(int id)
        {
            return Ok(await _commentService.ByProduct(id));
        }

        [HttpGet("ByUser/{id}")]
        public async Task<IActionResult> ByUser(int id, [FromQuery] ListSortWriteVm listSorting)
        {
            return Ok(await _commentService.ByUser(id, listSorting));
        }

        [HttpPost]
        public async Task<IActionResult> Post(CommentCreateVm modelComment)
        {
            return Ok(await _commentService.Post(modelComment));
        }

        [HttpPut]
        public async Task<IActionResult> Put(CommentUpdateVm modelComment)
        {
            return Ok(await _commentService.Put(modelComment));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _commentService.Delete(id));
        }
    }
}
