using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Utilities.Security
{
    public static class JwtSecurity
    {
        private static readonly string secureKey = "Secure key to implement Jwt";

        public static string GenerateJwt(int id)
        {
            SymmetricSecurityKey symmetricSecurityKey = new(Encoding.UTF8.GetBytes(secureKey));
            SigningCredentials credentials = new(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            JwtHeader header = new(credentials);

            JwtPayload payload = new(id.ToString(), null, null, null, DateTime.UtcNow.AddHours(1));
            JwtSecurityToken securityToken = new(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public static JwtSecurityToken Verify(string jwt)
        {
            JwtSecurityTokenHandler tokenHandler = new();
            byte[] key = Encoding.ASCII.GetBytes(secureKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false,
            }, out SecurityToken validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
