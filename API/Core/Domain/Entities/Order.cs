﻿using Domain.Entities.Common;
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

        //// References

        // Created by User
        public User OrderedBy { get; set; }

        // Products
        public Product Product { get; set; }

    }
}
