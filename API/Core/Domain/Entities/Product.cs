using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }

        //// References

        // Category
        public Category Category { get; set; }

        // Comments
        public ICollection<Comment>? Comments { get; set; }

        // Created By Seller
        public Seller CreatedBy { get; set; }

        // Orders
        public ICollection<Order>? Orders { get; set; }

    }
}
