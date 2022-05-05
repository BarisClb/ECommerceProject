using Domain.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Dtos.Common
{
    public class BaseResponseWithJwt
    {
        public BaseResponse Response { get; set; }
        public string? Jwt { get; set; }

        public BaseResponseWithJwt(BaseResponse response, string? jwt)
        {
            Response = response;
            Jwt = jwt;
        }
    }
}
