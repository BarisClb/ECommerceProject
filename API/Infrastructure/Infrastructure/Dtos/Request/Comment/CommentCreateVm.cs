using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Request
{
    public class CommentCreateVm
    {
        public string Title { get; set; }
        public string Text { get; set; }
        public byte Rating { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
    }
}
