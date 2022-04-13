using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class CommentReply : BaseEntity
    {
        public string Text { get; set; }

        //// Relations

        // Replied Comment
        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        // Replied Comment's Product => to get them all at once
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // Commenter Seller
        public int SellerId { get; set; }
        public Seller Seller { get; set; }


    }
}
