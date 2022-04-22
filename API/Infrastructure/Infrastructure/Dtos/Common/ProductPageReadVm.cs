using Infrastructure.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class ProductPageReadVm
    {
        public ProductReadVm Product { get; set; }
        public SellerReadVm Seller { get; set; }
        public IList<CommentReadVm>? Comments { get; set; }
        public IList<CommentReplyReadVm>? CommentReplies { get; set; }
        public IList<LikeReadVm>? Likes { get; set; }
    }
}
