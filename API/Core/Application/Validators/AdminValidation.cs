using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Validators
{
    public static class AdminValidation
    {
        public static bool CheckAdmin(string adminPass)
        {
            if (adminPass == "123")
                return true;

            return false;
        }
    }
}
