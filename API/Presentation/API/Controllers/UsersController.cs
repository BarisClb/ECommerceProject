using Infrastructure.Dtos.Request;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly private UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.Get());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _userService.Get(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserCreateVm modelUser)
        {
            return Ok(await _userService.Post(modelUser));
        }

        [HttpPut]
        public async Task<IActionResult> Put(UserUpdateVm modelUser)
        {
            return Ok(await _userService.Put(modelUser));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _userService.Delete(id));
        }
    }
}
