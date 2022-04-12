using Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        public bool Admin { get; set; }

        //// References

        // Written Comments -> Comments will have 'CreatedBy' User data, maybe We can get the 'Comment History' that way.
        public ICollection<Comment>? Comments { get; set; }

        // Liked Comments
        public ICollection<Like>? Likes { get; set; }

        // Orders -> Orders will have 'OrderedBy' User data, maybe We can get the 'Order History' that way.
        public ICollection<Order>? Orders { get; set; }

    }
}
