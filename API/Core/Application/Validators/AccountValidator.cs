using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Application.Validators
{
    public static class AccountValidator
    {
        public static bool CheckAdmin(string adminPass)
        {
            if (adminPass == "123")
                return true;

            return false;
        }

        public static bool CheckEMail(string email)
        {
            Regex emailRegex = new(@"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*");

            if (emailRegex.Match(email).Success)
                return true;

            return false;
        }
    }
}
