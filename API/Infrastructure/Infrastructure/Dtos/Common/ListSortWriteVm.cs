using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class ListSortWriteVm
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public bool Reverse { get; set; } = false;
        public string OrderBy { get; set; } = "DateCreated";
    }
}
