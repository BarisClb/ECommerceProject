using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        readonly private AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("LogIn")]
        public async Task<IActionResult> LogIn(AccountAuthWriteVm accountAuthInfo)
        {
            BaseResponseWithJwt response = await _accountService.LogIn(accountAuthInfo);

            // If it fails, send the FailResponse
            if (!response.Response.Success)
            {
                // If cookie with that name exist, delete it
                string? jwt = Request.Cookies[$"jwt{accountAuthInfo.AccountType}"];
                if (jwt != null)
                    Response.Cookies.Delete($"jwt{accountAuthInfo.AccountType}");

                return Ok(response.Response);
            }

            // If it succeeds, add token as a Cookie, based on the Account Type
            // We need to add options if we want to Append the Cookie while working with LocalHost. If we don't, it doesn't hold the Cookie.
            // HttpOnly prevents Client side scripts from accessing the data. 
            Response.Cookies.Append($"jwt{accountAuthInfo.AccountType}", response.Jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
            });
            return Ok(response.Response);
        }

        [HttpGet("Verify")]
        public async Task<IActionResult> Verify(string accountType)
        {
            if (accountType != "User" && accountType != "Seller")
                return Ok(new { success = false, message = "AccountType does not exist." });

            string? jwt = Request.Cookies[$"jwt{accountType}"];

            return Ok(await _accountService.Verify(accountType, jwt));
        }

        [HttpPost("LogOut")]
        public async Task<IActionResult> LogOut(string accountType)
        {
            if (accountType != "User" && accountType != "Seller")
                return Ok(new { success = false, message = "AccountType does not exist." });

            string? jwt = Request.Cookies[$"jwt{accountType}"];
            if (jwt == null)
                return Ok(new { success = false, message = "Cookie does not exist." });

            Response.Cookies.Delete($"jwt{accountType}", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
            });

            return Ok(new { success = true, message = $"{accountType} logout successful." });
        }
    }
}
