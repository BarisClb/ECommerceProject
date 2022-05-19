using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Request
{
    public class UserUpdateVm
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? EMail { get; set; }
        // public string? OldPassword { get; set; }
        public string? Password { get; set; }
        public string? Address { get; set; }
        public bool? Admin { get; set; }
        public string? AdminPassword { get; set; }
    }
}
