using Application.Repositories;
using Domain.Entities;
using Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Repository
{
    public class LikeWriteRepository : WriteRepository<Like>, ILikeWriteRepository
    {
        public LikeWriteRepository(ECommerceProjectDbContext context) : base(context)
        { }
    }
}
