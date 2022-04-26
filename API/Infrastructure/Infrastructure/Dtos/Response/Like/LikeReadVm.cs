using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Response
{
    public class LikeReadVm
    {
        public int Id { get; set; }
        public int CommentId { get; set; }
        public string ProductName { get; set; }
        public int ProductId { get; set; }
        public string UserUsername { get; set; }
        public int UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
    }
}
