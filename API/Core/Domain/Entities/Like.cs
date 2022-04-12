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
        //// References

        // Comment Liked By
        public User LikedBy { get; set; }

        // Liked Comment
        public Comment LikedComment { get; set; }

    }
}
