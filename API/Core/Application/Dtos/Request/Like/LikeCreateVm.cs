﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.Request
{
    public class LikeCreateVm
    {
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public int ProductId { get; set; }
    }
}
