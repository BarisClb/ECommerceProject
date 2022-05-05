using Application.Repositories;
using Application.Utilities.Security;
using Domain.Entities;
using Domain.Responses;
using Infrastructure.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AuthService
    {
        readonly private ISellerWriteRepository _sellerWriteRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        readonly private IUserWriteRepository _userWriteRepository;
        readonly private IUserReadRepository _userReadRepository;

        public AuthService(ISellerWriteRepository sellerWriteRepository, ISellerReadRepository sellerReadRepository, IUserWriteRepository userWriteRepository, IUserReadRepository userReadRepository)
        {
            _sellerWriteRepository = sellerWriteRepository;
            _sellerReadRepository = sellerReadRepository;

            _userWriteRepository = userWriteRepository;
            _userReadRepository = userReadRepository;
        }

        public async Task<BaseResponse> LogIn(AccountAuthWriteVm accountAuthInfo)
        {
            // Check Account Type
            if (accountAuthInfo.AccountType == "User")
            {
                // Check if the User is using EMail or Username to LogIn
                if (accountAuthInfo.Username != null)
                {
                    // Check if User Exist
                    User user = await _userReadRepository.GetSingleAsync(u => u.Username == accountAuthInfo.Username);
                    if (user == null)
                        return new FailResponse($"User with '{accountAuthInfo.Username}' username does not exist.");
                    // Check if Password is Right
                    if (!Hash.CheckPassword(accountAuthInfo.Password, user.Password))
                        return new FailResponse("Password is incorrect.");
                    // If logIn information is correct
                    List<string> roles = new();
                    roles.Add("User");
                    if (user.Admin)
                        roles.Add("Admin");

                    return new SuccessfulResponse<AccountAuthReadVm>("LogIn successful.", new AccountAuthReadVm(accountAuthInfo.AccountType, user.Name, user.Username, user.EMail,roles));
                }
                else if (accountAuthInfo.EMail != null)
                {
                    // Check if User Exist
                    User user = await _userReadRepository.GetSingleAsync(u => u.EMail == accountAuthInfo.EMail);
                    if (user == null)
                        return new FailResponse($"User with '{accountAuthInfo.EMail}' email does not exist.");
                    // Check if Password is Right
                    if (accountAuthInfo.Password != user.Password)
                        return new FailResponse("Password is incorrect.");
                    // If logIn information is correct
                    List<string> roles = new();
                    roles.Add("User");
                    if (user.Admin)
                        roles.Add("Admin");

                    return new SuccessfulResponse<AccountAuthReadVm>("LogIn successful.", new AccountAuthReadVm(accountAuthInfo.AccountType, user.Name, user.Username, user.EMail, roles));
                }

            }
            else if (accountAuthInfo.AccountType == "Seller")
            {
                if (accountAuthInfo.Username != null)
                {
                    // Check if Seller Exist
                    Seller seller = await _sellerReadRepository.GetSingleAsync(s => s.Username == accountAuthInfo.Username);
                    if (seller == null)
                        return new FailResponse($"Seller with '{accountAuthInfo.Username}' username does not exist.");
                    // Check if Password is Right
                    if (accountAuthInfo.Password != seller.Password)
                        return new FailResponse("Password is incorrect.");
                    // If logIn information is correct
                    List<string> roles = new();
                    roles.Add("Seller");

                    return new SuccessfulResponse<AccountAuthReadVm>("LogIn successful.", new AccountAuthReadVm(accountAuthInfo.AccountType, seller.Name, seller.Username, seller.EMail, roles));
                }
                else if (accountAuthInfo.EMail != null)
                {
                    // Check if Seller Exist
                    Seller seller = await _sellerReadRepository.GetSingleAsync(s => s.EMail == accountAuthInfo.EMail);
                    if (seller == null)
                        return new FailResponse($"Seller with '{accountAuthInfo.EMail}' email does not exist.");
                    // Check if Password is Right
                    if (accountAuthInfo.Password != seller.Password)
                        return new FailResponse("Password is incorrect.");
                    // If logIn information is correct
                    List<string> roles = new();
                    roles.Add("Seller");

                    return new SuccessfulResponse<AccountAuthReadVm>("LogIn successful.", new AccountAuthReadVm(accountAuthInfo.AccountType, seller.Name, seller.Username, seller.EMail, roles));
                }
            }

            return new FailResponse("Invalid Account Type.");
        }
    }
}
