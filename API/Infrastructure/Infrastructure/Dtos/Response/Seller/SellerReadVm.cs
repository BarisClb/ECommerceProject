using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Response
{
    public class SellerReadVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
    }
}
