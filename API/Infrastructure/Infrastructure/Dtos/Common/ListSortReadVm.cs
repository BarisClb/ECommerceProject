using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class ListSortReadVm
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public bool Reverse { get; set; }
        public string OrderBy { get; set; }

        public ListSortReadVm(int pageNumber, int pageSize, int totalCount, bool reverse , string orderBy)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            Reverse = reverse;
            OrderBy = orderBy;
        }
    }
}
