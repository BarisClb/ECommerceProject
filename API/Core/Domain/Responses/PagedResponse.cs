using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Responses
{
    public class PagedResponse<T> : SuccessfulResponse<T>
    {
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PagedResponse(string message, T data, int totalCount, int pageNumber, int pageSize) : base(message, data)
        {
            Message = message;
            Data = data;
            TotalCount = totalCount;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
        public PagedResponse(T data, int totalCount, int pageNumber, int pageSize) : base(data)
        {
            Data = data;
            TotalCount = totalCount;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}
