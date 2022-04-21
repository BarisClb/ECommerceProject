using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.Response
{
    public class CommentReplyReadVm
    {
        public int CommentReplyId { get; set; }
        public string Text { get; set; }
        public int CommentId { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
    }
}
