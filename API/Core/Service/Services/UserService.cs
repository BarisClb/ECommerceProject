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
    public class UserService
    {
        readonly private IUserWriteRepository _userWriteRepository;
        readonly private IUserReadRepository _userReadRepository;

        readonly private ILikeReadRepository _likeReadRepository;
        readonly private ILikeWriteRepository _likeWriteRepository;
        readonly private ISellerReadRepository _sellerReadRepository;

        public UserService(
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

        public async Task<SortedResponse<IList<UserReadVm>, ListSortReadVm>> Get(ListSortWriteVm listSorting)
        {
            // Search Word
            IList<User> users;
            if (!string.IsNullOrWhiteSpace(listSorting.SearchWord))
            {
                users = _userReadRepository.GetWhere(u => u.Username.Contains(listSorting.SearchWord)).ToList();
            }
            else
            {
                users = _userReadRepository.GetAll(false).ToList();
            }
            // Sort => Reverse? OrderBy?
            IList<User> orderedUsers;
            if (listSorting.Reversed)
            {
                orderedUsers = listSorting.OrderBy switch
                {
                    "Name" => users.OrderByDescending(u => u.Name).ToList(),
                    "Username" => users.OrderByDescending(u => u.Username).ToList(),
                    "EMail" => users.OrderByDescending(u => u.EMail).ToList(),
                    // "CommentCount" => users.OrderByDescending(u => u.Comments.Count).ToList(),
                    // "OrderCount" => users.OrderByDescending(u => u.Orders.Count).ToList(),
                    _ => users.Reverse().ToList(),
                };
            }
            else
            {
                orderedUsers = listSorting.OrderBy switch
                {
                    "Name" => users.OrderBy(u => u.Name).ToList(),
                    "Username" => users.OrderBy(u => u.Username).ToList(),
                    "EMail" => users.OrderBy(u => u.EMail).ToList(),
                    // "CommentCount" => users.OrderBy(u => u.Comments.Count).ToList(),
                    // "OrderCount" => users.OrderBy(u => u.Orders.Count).ToList(),
                    _ => users,
                };
            }
            // Pagination and Mapping
            if (listSorting.PageSize == 0)
                listSorting.PageSize = users.Count;

            IList<UserReadVm> mappedUsers = orderedUsers.Skip((listSorting.PageNumber - 1) * listSorting.PageSize).Take(listSorting.PageSize).Select(user => new UserReadVm
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                EMail = user.EMail,
                Password = user.Password,
                Address = user.Address,
                Admin = user.Admin,
                DateCreated = user.DateCreated,
                DateUpdated = user.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<UserReadVm>, ListSortReadVm>(mappedUsers, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, users.Count, listSorting.Reversed, listSorting.OrderBy));
        }

        public async Task<BaseResponse> Get(int id)
        {
            User user = await _userReadRepository.GetByIdAsync(id, false);
            if (user == null)
                return new FailResponse("User does not exist.");

            UserReadVm mappedUser = new()
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                EMail = user.EMail,
                Password = user.Password,
                Address = user.Address,
                Admin = user.Admin,
                DateCreated = user.DateCreated,
                DateUpdated = user.DateUpdated,
            };

            return new SuccessfulResponse<UserReadVm>(mappedUser);
        }

        public async Task<BaseResponse> Post(UserCreateVm modelUser)
        {
            // Checking if the Information is Empty
            if (String.IsNullOrWhiteSpace(modelUser.Name))
                return new FailResponse("Invalid Name.");
            if (String.IsNullOrWhiteSpace(modelUser.Username))
                return new FailResponse("Invalid Username.");
            if (String.IsNullOrWhiteSpace(modelUser.EMail))
                return new FailResponse("Invalid EMail.");
            if (String.IsNullOrWhiteSpace(modelUser.Password))
                return new FailResponse("Invalid Password.");
            if (String.IsNullOrWhiteSpace(modelUser.Address))
                return new FailResponse("Invalid Address.");

            // Trimming
            modelUser.Name = modelUser.Name.Trim();
            modelUser.Username = modelUser.Username.Trim();
            modelUser.EMail = modelUser.EMail.Trim();
            modelUser.Address = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelUser.Address);

            // Checking if Username and Email are Unique for both User and Seller
            if (await _userReadRepository.GetSingleAsync(user => user.Username == modelUser.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelUser.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelUser.EMail) != null)
                return new FailResponse("EMail already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelUser.EMail) != null)
                return new FailResponse("EMail already exists.");

            // Username Validation with Regex
            if (EntityValidator.CheckSingleWhiteSpace(modelUser.Username))
                return new FailResponse("Invalid Username format.(No Whitespaces)");
            // EMail Validation with Regex
            if (!AccountValidator.CheckEMail(modelUser.EMail) || EntityValidator.CheckSingleWhiteSpace(modelUser.EMail))
                return new FailResponse("Invalid EMail format.(example@example.com)");
            // Password Validation with Regex
            if (EntityValidator.CheckSingleWhiteSpace(modelUser.Password))
                return new FailResponse("Invalid Password format.(No Whitespaces)");

            // Admin Validation with Custom Admin Password
            bool admin = false;
            if (modelUser.Admin != null)
                admin = (bool)modelUser.Admin;
            if (modelUser.AdminPassword != null && AccountValidator.CheckAdmin(modelUser.AdminPassword))
                admin = true;

            await _userWriteRepository.AddAsync(new()
            {
                Name = modelUser.Name,
                Username = modelUser.Username,
                EMail = modelUser.EMail,
                Password = HashSecurity.HashPassword(modelUser.Password),
                Address = modelUser.Address,
                Admin = admin,
            });

            await _userWriteRepository.SaveAsync();
            return new SuccessfulResponse<User>("User created.");
        }

        public async Task<BaseResponse> Put(UserUpdateVm modelUser)
        {
            // Checking if the Information is Empty
            if (modelUser.Name != null && modelUser.Name.Trim() == "")
                return new FailResponse("Invalid Name.");
            if (modelUser.Username != null && modelUser.Username.Trim() == "")
                return new FailResponse("Invalid Username.");
            if (modelUser.EMail != null && modelUser.EMail.Trim() == "")
                return new FailResponse("Invalid EMail.");
            if (modelUser.Password != null && modelUser.Password.Trim() == "")
                return new FailResponse("Invalid Password.");
            if (modelUser.Address != null && modelUser.Address.Trim() == "")
                return new FailResponse("Invalid Address.");

            User user = await _userReadRepository.GetByIdAsync(modelUser.Id);
            if (user == null)
                return new FailResponse("User does not exist.");

            if (modelUser.Name != null)
                user.Name = modelUser.Name.Trim();
            if (modelUser.Username != null)
            {
                modelUser.Username = modelUser.Username.Trim();

                if (await _userReadRepository.GetSingleAsync(user => user.Username == modelUser.Username) != null)
                    return new FailResponse("Username already exists.");
                if (EntityValidator.CheckSingleWhiteSpace(modelUser.Username))
                    return new FailResponse("Invalid Username format.(No Whitespaces)");

                user.Username = modelUser.Username;
            }
            if (modelUser.EMail != null)
            {
                modelUser.EMail = modelUser.EMail.Trim();

                if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelUser.EMail) != null)
                    return new FailResponse("EMail already exists.");
                if (!AccountValidator.CheckEMail(modelUser.EMail))
                    return new FailResponse("Invalid EMail format.");

                user.EMail = modelUser.EMail;
            }
            if (modelUser.Password != null)
            {
                if (EntityValidator.CheckSingleWhiteSpace(modelUser.Password))
                    return new FailResponse("Invalid Password format.(No Whitespaces)");

                user.Password = HashSecurity.HashPassword(modelUser.Password);
            }
            if (modelUser.Address != null)
            {
                user.Address = EntityValidator.TrimAndReplaceMultipleWhitespaces(modelUser.Address);
            }
            if (modelUser.Admin != null)
                user.Admin = (bool)modelUser.Admin;
            if (modelUser.AdminPassword != null)
            {
                if (AccountValidator.CheckAdmin(modelUser.AdminPassword))
                    user.Admin = true;

                else { user.Admin = false; }
            }

            await _userWriteRepository.SaveAsync();
            return new SuccessfulResponse<User>("User updated.");
        }

        public async Task<BaseResponse> Delete(int id)
        {
            if (await _userReadRepository.GetByIdAsync(id) == null)
                return new FailResponse("User does not exist.");

            // Manually Deleting User Likes First, Because of the MsSQL Cascade problems.
            var userLikes = _likeReadRepository.GetWhere(likes => likes.UserId == id).ToList();
            if (userLikes != null)
                _likeWriteRepository.RemoveRange(userLikes);

            await _userWriteRepository.RemoveAsync(id);
            await _userWriteRepository.SaveAsync();
            return new SuccessfulResponse<User>("User deleted.");
        }
    }
}
