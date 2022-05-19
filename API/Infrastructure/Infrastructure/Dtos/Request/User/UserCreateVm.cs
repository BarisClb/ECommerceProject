using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Request
{
    public class UserCreateVm
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        // Admins have direct access to give/change 'Admin' role, normal Users will go through the 'AdminPassword'
        public string Address { get; set; }
        public bool? Admin { get; set; }
        public string? AdminPassword { get; set; }
    }
}
