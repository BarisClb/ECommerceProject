using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Response
{
    public class AccountAuthReadVm
    {
        public string AccountType { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public List<string> Roles { get; set; }

        public AccountAuthReadVm(string accountType, int id, string name, string username, string eMail, List<string> roles)
        {
            AccountType = accountType;
            Id = id;
            Name = name;
            Username = username;
            EMail = eMail;
            Roles = roles;
        }
    }
}
