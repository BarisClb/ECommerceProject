using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
    public class OrderCreateVm
    {
        public string? Description { get; set; }
        public string Address { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
    }
}
