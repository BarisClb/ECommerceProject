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
        public string Surname { get; set; }
        public string Username { get; set; }
        public string EMail { get; set; }
        public bool Admin { get; set; }
        
        // Products

        // Maybe Orders

        // Maybe Comments

        // Maybe Liked Comments

    }
}
