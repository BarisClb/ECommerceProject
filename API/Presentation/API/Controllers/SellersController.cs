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

        public SellersController(
            ISellerWriteRepository sellerWriteRepository,
            ISellerReadRepository sellerReadRepository)
        {
            _sellerWriteRepository = sellerWriteRepository;
            _sellerReadRepository = sellerReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(_sellerReadRepository.GetAll(false));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _sellerReadRepository.GetByIdAsync(id, false));
        }

        [HttpPost]
        public async Task<IActionResult> Post(VM_Create_Seller modelSeller)
        {
            await _sellerWriteRepository.AddAsync(new()
            {
                Name = modelSeller.Name,
                Username = modelSeller.Username,
                EMail = modelSeller.EMail,
                Password = modelSeller.Password
            });

            await _sellerWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Seller modelSeller)
        {
            Seller seller = await _sellerReadRepository.GetByIdAsync(modelSeller.SellerId);

            if (modelSeller.Name != null)
                seller.Name = modelSeller.Name;
            if (modelSeller.Username != null)
                seller.Username = modelSeller.Username;
            if (modelSeller.EMail != null)
                seller.EMail = modelSeller.EMail;
            if (modelSeller.Password != null)
                seller.Password = modelSeller.Password;

            await _sellerWriteRepository.SaveAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _sellerWriteRepository.RemoveAsync(id);
            await _sellerWriteRepository.SaveAsync();
            return Ok();
        }
    }
}
