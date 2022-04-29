using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Request
{
    public class OrderUpdateVm
    {
        public int Id { get; set; }
        public string? Note { get; set; }
        public string? Address { get; set; }
        public decimal? Price { get; set; }
        public int? Quantity { get; set; }
        public int? Discount { get; set; }
        public byte? OrderStatus { get; set; }
    }
}
