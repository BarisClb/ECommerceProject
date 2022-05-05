using Service.Services;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public static class ServiceRegistration
    {
        public static void ImplementServiceServices(this IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();

            services.AddMediatR(assembly);
            services.AddAutoMapper(assembly);

            //// Dependency Injections

            // Auth
            services.AddScoped<AuthService>();

            // Category
            services.AddScoped<CategoryService>();

            // Comment
            services.AddScoped<CommentService>();

            // Comment
            services.AddScoped<CommentReplyService>();

            // Like
            services.AddScoped<LikeService>();

            // Order
            services.AddScoped<OrderService>();

            // Product
            services.AddScoped<ProductService>();

            // Seller
            services.AddScoped<SellerService>();

            // User
            services.AddScoped<UserService>();
        }
    }
}
