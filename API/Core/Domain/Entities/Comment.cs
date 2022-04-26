using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Comment : BaseEntity
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }

        //// Relations

        // Comment Replies
        public ICollection<CommentReply>? CommentReplies { get; set; }

        // Comment Likes
        public ICollection<Like>? Likes { get; set; }

        // Product - Commented Product
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }

        // User - Commenter User
        public string UserUsername { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
