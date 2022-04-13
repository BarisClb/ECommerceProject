using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
    public class VM_Create_CommentReply
    {
        public string Text { get; set; }
        public int CommentId { get; set; }
        public int ProductId { get; set; }
        public int SellerId { get; set; }
    }
}
