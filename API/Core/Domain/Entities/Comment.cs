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

        //// References

        //// Comments Likes
        //public ICollection<Like>? Likes { get; set; }

        // Product
        public Product CommentedTo { get; set; }

        // User 
        public User WrittenBy { get; set; }

    }
}
