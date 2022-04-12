using Application.ViewModels;
using Application.Repositories;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly private IUserWriteRepository _userWriteRepository;
        readonly private IUserReadRepository _userReadRepository;

        readonly private ILikeReadRepository _likeReadRepository;
        readonly private ILikeWriteRepository _likeWriteRepository;

        public UsersController(
            IUserWriteRepository userWriteRepository,
            IUserReadRepository userReadRepository,

            ILikeReadRepository likeReadRepository,
            ILikeWriteRepository likeWriteRepository)
        {
            _userWriteRepository = userWriteRepository;
            _userReadRepository = userReadRepository;

            _likeReadRepository = likeReadRepository;
            _likeWriteRepository = likeWriteRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_userReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _userReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_User modelUser)
        {
            await _userWriteRepository.AddAsync(new()
            {
                Name = modelUser.Name,
                Username = modelUser.Username,
                EMail = modelUser.EMail,
                Password = modelUser.Password,
                Admin = modelUser.Admin
            });

            return Ok(await _userWriteRepository.SaveAsync());
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_User modelUser)
        {
            User user = await _userReadRepository.GetByIdAsync(modelUser.UserId);

            if (modelUser.Name != null)
                user.Name = modelUser.Name;
            if (modelUser.Username != null)
                user.Username = modelUser.Username;
            if (modelUser.EMail != null)
                user.EMail = modelUser.EMail;
            if (modelUser.Password != null)
                user.Password = modelUser.Password;
            if (modelUser.Admin != null)
                user.Admin = (bool)modelUser.Admin;

            await _userWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Deleting User Likes Manually Because MsSQL Cascade problems.
            User user = await _userReadRepository.GetByIdAsync(id);
            var userComments = _likeReadRepository.GetWhere(comment => comment.LikedBy == user).ToList();
            _likeWriteRepository.RemoveRange(userComments);

            await _userWriteRepository.RemoveAsync(id);
            await _userWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
