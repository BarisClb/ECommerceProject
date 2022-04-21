using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Like : BaseEntity
    {
        //// Relations

        // Liked Comment
        public int CommentId { get; set; }
        public Comment Comment { get; set; }

        // Product
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // Comment Liked By
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
