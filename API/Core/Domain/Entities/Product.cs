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

        //// Relations

        // Category it belongs to
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        // Comments
        public ICollection<Comment>? Comments { get; set; }

        // Comment Replies
        public ICollection<CommentReply>? CommentReplies { get; set; }

        // Orders
        public ICollection<Order>? Orders { get; set; }

        // Created By Seller
        public int SellerId { get; set; }
        public Seller Seller { get; set; }

    }
}
