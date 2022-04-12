using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
    public class VM_Update_Seller
    {
        public int SellerId { get; set; }
        public string? Name { get; set; }
        public string? Username { get; set; }
        public string? EMail { get; set; }
        public string? Password { get; set; }
    }
}
