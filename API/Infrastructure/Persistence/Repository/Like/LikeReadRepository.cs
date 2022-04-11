﻿using Application.Repositories;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository
{
    public class LikeReadRepository : ReadRepository<Like>, ILikeReadRepository
    {
        public LikeReadRepository(ECommerceProjectDbContext context) : base(context)
        {
        }

    }
}
