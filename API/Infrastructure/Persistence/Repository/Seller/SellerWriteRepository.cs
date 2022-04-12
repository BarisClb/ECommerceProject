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
    public class SellerWriteRepository : WriteRepository<Seller>, ISellerWriteRepository
    {
        public SellerWriteRepository(ECommerceProjectDbContext context) : base(context)
        { }
    }
}
