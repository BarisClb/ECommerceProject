using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Response
{
    public class OrderReadVm
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public string Address { get; set; }
        public byte OrderStatus { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
    }
}
