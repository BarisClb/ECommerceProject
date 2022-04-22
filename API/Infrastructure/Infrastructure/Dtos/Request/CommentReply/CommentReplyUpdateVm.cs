using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Request
{
    public class CommentReplyUpdateVm
    {
        public int CommentReplyId { get; set; }
        public string? Text { get; set; }
    }
}
