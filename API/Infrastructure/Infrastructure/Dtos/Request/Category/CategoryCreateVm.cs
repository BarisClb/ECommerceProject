using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Request
{
    public class CategoryCreateVm
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
