using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class ListSortWriteVm
    {
        private string searchWord = "";

        public string SearchWord { get => searchWord; set => searchWord = string.IsNullOrWhiteSpace(value) ? "" : value; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 0;
        public bool Reversed { get; set; } = false;
        public string OrderBy { get; set; } = "DateCreated";
    }
}
