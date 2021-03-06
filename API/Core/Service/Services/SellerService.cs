using Application.Repositories;
using Application.Utilities.Security;
using Application.Utilities.Validators;
using Domain.Entities;
using Domain.Responses;
using Infrastructure.Dtos.Common;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class SellerService
    {
        readonly private ISellerWriteRepository _sellerWriteRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        readonly private IUserReadRepository _userReadRepository;

        public SellerService(
            ISellerWriteRepository sellerWriteRepository,
            ISellerReadRepository sellerReadRepository,

            IUserReadRepository userReadRepository)
        {
            _sellerWriteRepository = sellerWriteRepository;
            _sellerReadRepository = sellerReadRepository;

            _userReadRepository = userReadRepository;
        }

        public async Task<SortedResponse<IList<SellerReadVm>, ListSortReadVm>> Get(ListSortWriteVm listSorting)
        {
            // Search Word
            IList<Seller> sellers;
            if (!string.IsNullOrWhiteSpace(listSorting.SearchWord))
            {
                sellers = _sellerReadRepository.GetWhere(s => s.Username.Contains(listSorting.SearchWord)).ToList();
            }
            else
            {
                sellers = _sellerReadRepository.GetAll(false).ToList();
            }
            // Sort => Reverse? OrderBy?
            IList<Seller> orderedSellers;
            if (listSorting.Reversed)
            {
                orderedSellers = listSorting.OrderBy switch
                {
                    "Name" => sellers.OrderByDescending(s => s.Name).ToList(),
                    "Username" => sellers.OrderByDescending(s => s.Username).ToList(),
                    "EMail" => sellers.OrderByDescending(s => s.EMail).ToList(),
                    // "ProductCount" => sellers.OrderByDescending(s => s.Products.Count).ToList(),
                    _ => sellers.Reverse().ToList(),
                };
            }
            else
            {
                orderedSellers = listSorting.OrderBy switch
                {
                    "Name" => sellers.OrderBy(s => s.Name).ToList(),
                    "Username" => sellers.OrderBy(s => s.Username).ToList(),
                    "EMail" => sellers.OrderBy(s => s.EMail).ToList(),
                    // "ProductCount" => sellers.OrderBy(s => s.Products.Count).ToList(),
                    _ => sellers,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = sellers.Count;

            IList<SellerReadVm> mappedSellers = orderedSellers.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(seller => new SellerReadVm
            {
                Id = seller.Id,
                Name = seller.Name,
                Username = seller.Username,
                EMail = seller.EMail,
                Password = seller.Password,
                DateCreated = seller.DateCreated,
                DateUpdated = seller.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<SellerReadVm>, ListSortReadVm>(mappedSellers, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, sellers.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> Get(int id)
        {
            Seller seller = await _sellerReadRepository.GetByIdAsync(id, false);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

            SellerReadVm mappedSeller = new()
            {
                Id = seller.Id,
                Name = seller.Name,
                Username = seller.Username,
                EMail = seller.EMail,
                Password = seller.Password,
                DateCreated = seller.DateCreated,
                DateUpdated = seller.DateUpdated,
            };

            return new SuccessfulResponse<SellerReadVm>(mappedSeller);
        }

        public async Task<BaseResponse> Post(SellerCreateVm modelSeller)
        {
            // Checking if the Information is Empty
            if (String.IsNullOrWhiteSpace(modelSeller.Name))
                return new FailResponse("Invalid Name.");
            if (String.IsNullOrWhiteSpace(modelSeller.Username))
                return new FailResponse("Invalid Username.");
            if (String.IsNullOrWhiteSpace(modelSeller.EMail))
                return new FailResponse("Invalid EMail.");
            if (String.IsNullOrWhiteSpace(modelSeller.Password))
                return new FailResponse("Invalid Password.");

            // Trimming
            modelSeller.Name = modelSeller.Name.Trim();
            modelSeller.Username = modelSeller.Username.Trim();
            modelSeller.EMail = modelSeller.EMail.Trim();

            // Checking if Username and Email are Unique for both Seller and User
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.Name == modelSeller.Name) != null)
                return new FailResponse("Name already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.Username == modelSeller.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelSeller.EMail) != null)
                return new FailResponse("EMail already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelSeller.EMail) != null)
                return new FailResponse("EMail already exists.");

            // Username Validation with Regex
            if (EntityValidator.CheckSingleWhiteSpace(modelSeller.Username))
                return new FailResponse("Invalid Username format.(No Whitespaces)");
            // EMail Validation with Regex
            if (!AccountValidator.CheckEMail(modelSeller.EMail))
                return new FailResponse("Invalid EMail format.");
            // Password Validation with Regex
            if (EntityValidator.CheckSingleWhiteSpace(modelSeller.Password))
                return new FailResponse("Invalid Password format.(No Whitespaces)");

            await _sellerWriteRepository.AddAsync(new()
            {
                Name = modelSeller.Name,
                Username = modelSeller.Username,
                EMail = modelSeller.EMail,
                Password = HashSecurity.HashPassword(modelSeller.Password),
            });

            await _sellerWriteRepository.SaveAsync();
            return new SuccessfulResponse<Seller>("Seller created.");
        }

        public async Task<BaseResponse> Put(SellerUpdateVm modelSeller)
        {
            // Checking if the Information is Empty
            if (modelSeller.Name != null && modelSeller.Name == "")
                return new FailResponse("Invalid Name.");
            if (modelSeller.Username != null && modelSeller.Username == "")
                return new FailResponse("Invalid Username.");
            if (modelSeller.EMail != null && modelSeller.EMail == "")
                return new FailResponse("Invalid EMail.");
            if (modelSeller.Password != null && modelSeller.Password == "")
                return new FailResponse("Invalid Password.");

            Seller seller = await _sellerReadRepository.GetByIdAsync(modelSeller.Id);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

            if (modelSeller.Name != null)
                seller.Name = modelSeller.Name.Trim();
            if (modelSeller.Username != null)
            {
                modelSeller.Username = modelSeller.Username.Trim();

                if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelSeller.Username) != null)
                    return new FailResponse("Username already exists.");
                if (EntityValidator.CheckSingleWhiteSpace(modelSeller.Username))
                    return new FailResponse("Invalid Username format.(No Whitespaces)");

                seller.Username = modelSeller.Username;
            }
            if (modelSeller.EMail != null)
            {
                modelSeller.EMail = modelSeller.EMail.Trim();

                if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelSeller.EMail) != null)
                    return new FailResponse("EMail already exists.");
                if (!AccountValidator.CheckEMail(modelSeller.EMail))
                    return new FailResponse("Invalid EMail format.");

                seller.EMail = modelSeller.EMail;
            }
            if (modelSeller.Password != null)
            {
                if (EntityValidator.CheckSingleWhiteSpace(modelSeller.Password))
                    return new FailResponse("Invalid Password format.(No Whitespaces)");

                seller.Password = HashSecurity.HashPassword(modelSeller.Password);
            }

            await _sellerWriteRepository.SaveAsync();
            return new SuccessfulResponse<Seller>("Seller updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _sellerReadRepository.GetByIdAsync(id, false) == null)
                return new FailResponse("Seller does not exist.");

            await _sellerWriteRepository.RemoveAsync(id);
            await _sellerWriteRepository.SaveAsync();
            return new SuccessfulResponse<Seller>("Seller deleted.");
        }
    }
}
