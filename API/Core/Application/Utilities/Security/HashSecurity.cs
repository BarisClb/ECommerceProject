using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utilities.Security
{
    public static class HashSecurity
    {
        public static string HashPassword(string password)
        {
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            return hashedPassword;
        }

        public static bool CheckPassword(string password1, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password1, hashedPassword);
        }

    }
}
