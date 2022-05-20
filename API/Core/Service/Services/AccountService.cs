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
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class AccountService
    {
        readonly private ISellerReadRepository _sellerReadRepository;

        readonly private IUserReadRepository _userReadRepository;

        public AccountService(ISellerReadRepository sellerReadRepository, IUserReadRepository userReadRepository)
        {
            _sellerReadRepository = sellerReadRepository;

            _userReadRepository = userReadRepository;
        }

        public async Task<BaseResponseWithJwt> LogIn(AccountAuthWriteVm accountAuthInfo)
        {
            // Check Account Type
            if (accountAuthInfo.AccountType == "User")
            {
                User user;

                // Check if the User is using EMail to LogIn
                if (AccountValidator.CheckEMail(accountAuthInfo.Account))
                {
                    // Check if User Exist
                    user = await _userReadRepository.GetSingleAsync(u => u.EMail == accountAuthInfo.Account, false);
                    if (user == null)
                        return new BaseResponseWithJwt(new FailResponse($"User with '{accountAuthInfo.Account}' email does not exist."), null);
                }
                // If nothing else, check Username
                else
                {
                    // Check if User Exist
                    user = await _userReadRepository.GetSingleAsync(u => u.Username == accountAuthInfo.Account, false);
                    if (user == null)
                        return new BaseResponseWithJwt(new FailResponse($"User with '{accountAuthInfo.Account}' username does not exist."), null);
                }

                // Check if Password is Right
                if (!HashSecurity.CheckPassword(accountAuthInfo.Password, user.Password))
                    return new BaseResponseWithJwt(new FailResponse("Password is incorrect."), null);
                // If logIn information is correct
                List<string> roles = new();
                roles.Add("User");
                if (user.Admin)
                    roles.Add("Admin");

                string jwt = JwtSecurity.GenerateJwt(user.Id);

                return new BaseResponseWithJwt(new SuccessfulResponse<AccountAuthReadVm>("LogIn successful.", new AccountAuthReadVm(accountAuthInfo.AccountType, user.Id, user.Name, user.Username, user.EMail, roles)), jwt);
            }
            else if (accountAuthInfo.AccountType == "Seller")
            {
                Seller seller;

                // Check if the Seller is using EMail to LogIn
                if (AccountValidator.CheckEMail(accountAuthInfo.Account))
                {
                    // Check if Seller Exist
                    seller = await _sellerReadRepository.GetSingleAsync(s => s.EMail == accountAuthInfo.Account, false);
                    if (seller == null)
                        return new BaseResponseWithJwt(new FailResponse($"Seller with '{accountAuthInfo.Account}' email does not exist."), null);
                }
                // If nothing else, check Username
                else
                {
                    // Check if Seller Exist
                    seller = await _sellerReadRepository.GetSingleAsync(s => s.Username == accountAuthInfo.Account, false);
                    if (seller == null)
                        return new BaseResponseWithJwt(new FailResponse($"Seller with '{accountAuthInfo.Account}' username does not exist."), null);
                }

                // Check if Password is Right
                if (!HashSecurity.CheckPassword(accountAuthInfo.Password, seller.Password))
                    return new BaseResponseWithJwt(new FailResponse("Password is incorrect."), null);
                // If logIn information is correct
                List<string> roles = new();
                roles.Add("Seller");

                string jwt = JwtSecurity.GenerateJwt(seller.Id);

                return new BaseResponseWithJwt(new SuccessfulResponse<AccountAuthReadVm>("LogIn successful.", new AccountAuthReadVm(accountAuthInfo.AccountType, seller.Id, seller.Name, seller.Username, seller.EMail, roles)), jwt);
            }

            return new BaseResponseWithJwt(new FailResponse("Invalid Account Type."), null);
        }

        public async Task<BaseResponse> Verify(string accountType, string? jwt)
        {
            if (jwt == null)
                return new FailResponse("Jwt does not exist.");


            JwtSecurityToken token = JwtSecurity.Verify(jwt);
            int accountId = int.Parse(token.Issuer);

            if (accountType == "User")
            {
                User user = await _userReadRepository.GetByIdAsync(accountId, false);
                if (user == null)
                    return new FailResponse("User does not exist.");

                List<string> roles = new();
                roles.Add("User");
                if (user.Admin)
                    roles.Add("Admin");

                return new SuccessfulResponse<AccountAuthReadVm>("Verification successful.", new AccountAuthReadVm(accountType, user.Id, user.Name, user.Username, user.EMail, roles));
            }
            else if (accountType == "Seller")
            {
                Seller seller = await _sellerReadRepository.GetByIdAsync(accountId, false);
                if (seller == null)
                    return new FailResponse("Seller does not exist.");

                List<string> roles = new();
                roles.Add("Seller");

                return new SuccessfulResponse<AccountAuthReadVm>("Verification successful.", new AccountAuthReadVm(accountType, seller.Id, seller.Name, seller.Username, seller.EMail, roles));
            }

            return new FailResponse("Jwt verification failed.");
        }

    }
}
