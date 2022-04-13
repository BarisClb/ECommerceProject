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
    public class SellersController : ControllerBase
    {
        readonly private ISellerWriteRepository _sellerWriteRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        readonly private IUserReadRepository _userReadRepository;

        public SellersController(
            ISellerWriteRepository sellerWriteRepository,
            ISellerReadRepository sellerReadRepository,

            IUserReadRepository userReadRepository)
        {
            _sellerWriteRepository = sellerWriteRepository;
            _sellerReadRepository = sellerReadRepository;

            _userReadRepository = userReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_sellerReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            Seller seller = await _sellerReadRepository.GetByIdAsync(id, false);
            if (seller == null)
                return NotFound("Seller does not exist.");

            return Ok(seller);
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Seller modelSeller)
        {
            // Checking if Username and Email are Unique for both Seller and User
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelSeller.Username) != null)
                return BadRequest("Username already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.Username == modelSeller.Username) != null)
                return BadRequest("Username already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelSeller.EMail) != null)
                return BadRequest("EMail already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelSeller.EMail) != null)
                return BadRequest("EMail already exists.");

            // EMail Validation with Regex
            if (!EMailValidation.CheckEMail(modelSeller.EMail))
                return BadRequest("Invalid EMail.");

            await _sellerWriteRepository.AddAsync(new()
            {
                Name = modelSeller.Name,
                Username = modelSeller.Username,
                EMail = modelSeller.EMail,
                Password = modelSeller.Password
            });

            await _sellerWriteRepository.SaveAsync();
            return Ok("Seller created.");
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Seller modelSeller)
        {
            Seller seller = await _sellerReadRepository.GetByIdAsync(modelSeller.SellerId);
            if (seller == null)
                return NotFound("Seller does not exist.");

            if (modelSeller.Name != null)
                seller.Name = modelSeller.Name;
            if (modelSeller.Username != null)
            {
                if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelSeller.Username) != null)
                    return BadRequest("Username already exists.");

                seller.Username = modelSeller.Username;
            }
            if (modelSeller.EMail != null)
            {
                if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelSeller.EMail) != null)
                    return BadRequest("EMail already exists.");
                if (!EMailValidation.CheckEMail(modelSeller.EMail))
                    return BadRequest("Invalid EMail.");

                seller.EMail = modelSeller.EMail;
            }
            if (modelSeller.Password != null)
                seller.Password = modelSeller.Password;

            await _sellerWriteRepository.SaveAsync();
            return Ok("Seller updated.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return NotFound("Seller does not exist.");

            await _sellerWriteRepository.RemoveAsync(id);
            await _sellerWriteRepository.SaveAsync();
            return Ok("Seller deleted.");
        }
    }
}
