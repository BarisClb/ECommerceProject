﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
    public class VM_Update_Order
    {
        public int OrderId { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public byte? OrderStatus { get; set; }
    }
}