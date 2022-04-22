using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Response
{
    public class CommentReplyReadVm
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int CommentId { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public string Sellername { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
    }
}
