using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Seller : BaseEntity
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }

        //// References

        // Products
        public ICollection<Product>? Products { get; set; }

    }
}
