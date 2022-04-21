using Application.Dtos.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.Common
{
    public class ProductPageReadVm
    {
        public ProductReadVm Product { get; set; }
        public SellerReadVm Seller { get; set; }
        public IQueryable<CommentReadVm>? Comments { get; set; }
        public IQueryable<CommentReplyReadVm>? CommentReplies { get; set; }
        public IQueryable<LikeReadVm>? Likes { get; set; }
    }
}
