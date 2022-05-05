using Application.Repositories;
using Infrastructure.Dtos.Request;
using Infrastructure.Dtos.Response;
using Infrastructure.Dtos.Common;
using Application.Utilities.Validators;
using Application.Utilities.Security;
using Domain.Responses;
using Domain.Entities;
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
            if (listSorting.Reverse)
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
                Admin = user.Admin,
                DateCreated = user.DateCreated,
                DateUpdated = user.DateUpdated,
            }).ToList();

            return new SortedResponse<IList<UserReadVm>, ListSortReadVm>(mappedUsers, new ListSortReadVm(listSorting.SearchWord, listSorting.PageNumber, listSorting.PageSize, users.Count, listSorting.Reverse, listSorting.OrderBy));
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
                Admin = user.Admin,
                DateCreated = user.DateCreated,
                DateUpdated = user.DateUpdated,
            };

            return new SuccessfulResponse<UserReadVm>(mappedUser);
        }

        public async Task<BaseResponse> Post(UserCreateVm modelUser)
        {
            // Checking if Username and Email are Unique for both User and Seller
            if (await _userReadRepository.GetSingleAsync(user => user.Username == modelUser.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.Username == modelUser.Username) != null)
                return new FailResponse("Username already exists.");
            if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelUser.EMail) != null)
                return new FailResponse("EMail already exists.");
            if (await _sellerReadRepository.GetSingleAsync(seller => seller.EMail == modelUser.EMail) != null)
                return new FailResponse("EMail already exists.");

            // EMail Validation with Regex
            if (!AccountValidator.CheckEMail(modelUser.EMail))
                return new FailResponse("Invalid EMail.");

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
                Password = Hash.HashPassword(modelUser.Password),
                Admin = admin
            });

            await _userWriteRepository.SaveAsync();
            return new SuccessfulResponse<User>("User created.");
        }

        public async Task<BaseResponse> Put(UserUpdateVm modelUser)
        {
            User user = await _userReadRepository.GetByIdAsync(modelUser.Id);
            if (user == null)
                return new FailResponse("User does not exist.");

            if (modelUser.Name != null)
                user.Name = modelUser.Name;
            if (modelUser.Username != null)
            {
                if (await _userReadRepository.GetSingleAsync(user => user.Username == modelUser.Username) != null)
                    return new FailResponse("Username already exists.");

                user.Username = modelUser.Username;
            }
            if (modelUser.EMail != null)
            {
                if (await _userReadRepository.GetSingleAsync(user => user.EMail == modelUser.EMail) != null)
                    return new FailResponse("EMail already exists.");
                if (!AccountValidator.CheckEMail(modelUser.EMail))
                    return new FailResponse("Invalid EMail.");

                user.EMail = modelUser.EMail;
            }
            if (modelUser.Password != null)
                user.Password = Hash.HashPassword(modelUser.Password);
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
