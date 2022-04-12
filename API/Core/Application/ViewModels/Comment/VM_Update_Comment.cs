using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels
{
   public class VM_Update_Comment
   {
      public int CommentId { get; set; }
      public string? Title { get; set; }
      public string? Text { get; set; }
      public int? Rating { get; set; }

   }
}
