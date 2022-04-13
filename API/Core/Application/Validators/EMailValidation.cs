using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Validators
{
    public static class EMailValidation
    {
        public static bool CheckEMail(string email)
        {
            Regex emailRegex = new Regex(@"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*");

            if (emailRegex.Match(email).Success)
                return true;

            return false;
        }
    }
}
