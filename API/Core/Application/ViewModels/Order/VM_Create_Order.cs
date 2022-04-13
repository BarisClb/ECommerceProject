using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
    public class VM_Create_Order
    {
        public string? Description { get; set; }
        public string Address { get; set; }
        public int OrderedBy { get; set; }
        public int ProductId { get; set; }
    }
}
