using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class ListSortReadVm
    {
        public string SearchWord { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public bool Reversed { get; set; }
        public string OrderBy { get; set; }

        public ListSortReadVm(string searchWord, int pageNumber, int pageSize, int totalCount, bool reversed , string orderBy)
        {
            SearchWord = searchWord;
            PageNumber = pageNumber;
            PageSize = pageSize;
            TotalCount = totalCount;
            Reversed = reversed;
            OrderBy = orderBy;
        }
    }
}
