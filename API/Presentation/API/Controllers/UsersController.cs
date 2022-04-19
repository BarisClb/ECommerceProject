using Application.Validators;
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
        readonly private ISellerReadRepository _sellerReadRepository;

        public UsersController(
            IUserWriteRepository userWriteRepository,
            IUserReadRepository userReadRepository,

            ILikeReadRepository likeReadRepository,
            ILikeWriteRepository likeWriteRepository,

            ISellerReadRepository sellerReadRepository)
        {
            _userWriteRepository = userWriteRepository;
            _userReadRepository = userReadRepository;

            _likeReadRepository = likeReadRepository;
            _likeWriteRepository = likeWriteRepository;
            _sellerReadRepository = sellerReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_userReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            User user = await _userReadRepository.GetByIdAsync(id, false);
            if (user == null)
                return NotFound("User does not exist.");

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserCreateVm modelUser)
        {
            // Checking if Username and Email are Unique for both User and Seller
            if (await _userReadRepository.GetSingleAsync(user => user.Username == modelUser.Username) != null)
                return BadRequest("Username already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelUser.Username) != null)
                return BadRequest("Username already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelUser.EMail) != null)
                return BadRequest("EMail already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelUser.EMail) != null)
                return BadRequest("EMail already exists.");

            // EMail Validation with Regex
            if (!AccountValidator.CheckEMail(modelUser.EMail))
                return BadRequest("Invalid EMail.");

            // Admin Validation with Custom Admin Password
            bool admin = false;
            if (AccountValidator.CheckAdmin(modelUser.Admin))
                admin = true;

            await _userWriteRepository.AddAsync(new()
            {
                Name = modelUser.Name,
                Username = modelUser.Username,
                EMail = modelUser.EMail,
                Password = modelUser.Password,
                Admin = admin
            });

            await _userWriteRepository.SaveAsync();
            return Ok("User created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(UserUpdateVm modelUser)
        {
            User user = await _userReadRepository.GetByIdAsync(modelUser.UserId);
            if (user == null)
                return NotFound("User does not exist.");

            if (modelUser.Name != null)
                user.Name = modelUser.Name;
            if (modelUser.Username != null)
            {
                if (await _userReadRepository.GetSingleAsync(user => user.Username == modelUser.Username) != null)
                    return BadRequest("Username already exists.");

                user.Username = modelUser.Username;
            }
            if (modelUser.EMail != null)
            {
                if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelUser.EMail) != null)
                    return BadRequest("EMail already exists.");
                if (!AccountValidator.CheckEMail(modelUser.EMail))
                    return BadRequest("Invalid EMail.");

                user.EMail = modelUser.EMail;
            }
            if (modelUser.Password != null)
                user.Password = modelUser.Password;
            if (modelUser.Admin != null)
            {
                if (AccountValidator.CheckAdmin(modelUser.Admin))
                    user.Admin = true;

                else { user.Admin = false; }
            }

            await _userWriteRepository.SaveAsync();
            return Ok("User updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id) == null)
                return NotFound("User does not exist.");

            // Manually Deleting User Likes First, Because of the MsSQL Cascade problems.
            var userLikes = _likeReadRepository.GetWhere(likes => likes.UserId == id).ToList();
            if (userLikes != null)
                _likeWriteRepository.RemoveRange(userLikes);

            await _userWriteRepository.RemoveAsync(id);
            await _userWriteRepository.SaveAsync();
            return Ok("User deleted.");
        }
    }
}
