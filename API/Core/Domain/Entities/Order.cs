using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Order : BaseEntity
    {
        public string? Description { get; set; }
        public string Address { get; set; }
        public byte OrderStatus { get; set; }

        //// Relations

        // Product
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // Seller of the Product => For the Seller Page
        public string SellerUsername { get; set; }
        public int SellerId { get; set; }
        public Seller Seller { get; set; }

        // Created by User - User that Ordered
        public string UserUsername { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
