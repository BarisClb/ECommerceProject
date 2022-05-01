﻿using Application.Repositories;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
using Infrastructure.Dtos.Common;
using Application.Validators;
using Domain.Responses;
using Domain.Entities;
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
            IList<Seller> sellers = _sellerReadRepository.GetAll(false).ToList();
            IList<Seller> orderedSellers;

            if (listSorting.Reverse)
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

            return new SortedResponse<IList<SellerReadVm>, ListSortReadVm>(mappedSellers, new ListSortReadVm(listSorting.PageNumber, listSorting.PageSize, sellers.Count, listSorting.Reverse, listSorting.OrderBy));
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
            // Checking if Username and Email are Unique for both Seller and User
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelSeller.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.Username == modelSeller.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelSeller.EMail) != null)
                return new FailResponse("EMail already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelSeller.EMail) != null)
                return new FailResponse("EMail already exists.");

            // EMail Validation with Regex
            if (!AccountValidator.CheckEMail(modelSeller.EMail))
                return new FailResponse("Invalid EMail.");

            await _sellerWriteRepository.AddAsync(new()
            {
                Name = modelSeller.Name,
                Username = modelSeller.Username,
                EMail = modelSeller.EMail,
                Password = modelSeller.Password
            });

            await _sellerWriteRepository.SaveAsync();
            return new SuccessfulResponse<Seller>("Seller created.");
        }

        public async Task<BaseResponse> Put(SellerUpdateVm modelSeller)
        {
            Seller seller = await _sellerReadRepository.GetByIdAsync(modelSeller.Id);
            if (seller == null)
                return new FailResponse("Seller does not exist.");

            if (modelSeller.Name != null)
                seller.Name = modelSeller.Name;
            if (modelSeller.Username != null)
            {
                if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelSeller.Username) != null)
                    return new FailResponse("Username already exists.");

                seller.Username = modelSeller.Username;
            }
            if (modelSeller.EMail != null)
            {
                if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelSeller.EMail) != null)
                    return new FailResponse("EMail already exists.");
                if (!AccountValidator.CheckEMail(modelSeller.EMail))
                    return new FailResponse("Invalid EMail.");

                seller.EMail = modelSeller.EMail;
            }
            if (modelSeller.Password != null)
                seller.Password = modelSeller.Password;

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
