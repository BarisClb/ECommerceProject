using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class AccountAuthReadVm
    {
        public string AccountType { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public List<string> Roles { get; set; }

        public AccountAuthReadVm(string accountType, string name, string username, string eMail, List<string> roles)
        {
            AccountType = accountType;
            Name = name;
            Username = username;
            EMail = eMail;
            Roles = roles;
        }
    }
}
