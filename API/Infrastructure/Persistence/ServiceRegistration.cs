using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public static class ServiceRegistration
    {
        public static void ImplementPersistenceServices(this IServiceCollection services)
        {
            // services.AddScoped<ICategoryReadRepository, CategoryReadRepository>();
            // services.AddScoped<ICategoryWriteRepository, CategoryWriteRepository>();

            // services.AddScoped<ICommentReadRepository, CommentReadRepository>();
            // services.AddScoped<ICommentWriteRepository, CommentWriteRepository>();

            // services.AddScoped<IOrderReadRepository, OrderReadRepository>();
            // services.AddScoped<IOrderWriteRepository, OrderWriteRepository>();

            // services.AddScoped<IProductReadRepository, ProductReadRepository>();
            // services.AddScoped<IProductWriteRepository, ProductWriteRepository>();

            // services.AddScoped<IUserReadRepository, UserReadRepository>();
            // services.AddScoped<IUserWriteRepository, UserWriteRepository>();

        }
    }
}
