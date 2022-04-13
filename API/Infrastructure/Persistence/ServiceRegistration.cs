using Application.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Contexts;
using Persistence.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public static class ServiceRegistration
    {
        public static void ImplementPersistenceServices(this IServiceCollection services, string connectionString)
        {
            // Sql Server Connection
            services.AddDbContext<ECommerceProjectDbContext>(options => options.UseSqlServer(connectionString));

            //// Dependency Injections
            
            // Category
            services.AddScoped<ICategoryReadRepository, CategoryReadRepository>();
            services.AddScoped<ICategoryWriteRepository, CategoryWriteRepository>();

            // Comment
            services.AddScoped<ICommentReadRepository, CommentReadRepository>();
            services.AddScoped<ICommentWriteRepository, CommentWriteRepository>();

            // Comment
            services.AddScoped<ICommentReplyReadRepository, CommentReplyReadRepository>();
            services.AddScoped<ICommentReplyWriteRepository, CommentReplyWriteRepository>();

            // Like
            services.AddScoped<ILikeReadRepository, LikeReadRepository>();
            services.AddScoped<ILikeWriteRepository, LikeWriteRepository>();

            // Order
            services.AddScoped<IOrderReadRepository, OrderReadRepository>();
            services.AddScoped<IOrderWriteRepository, OrderWriteRepository>();

            // Product
            services.AddScoped<IProductReadRepository, ProductReadRepository>();
            services.AddScoped<IProductWriteRepository, ProductWriteRepository>();

            // Seller
            services.AddScoped<ISellerReadRepository, SellerReadRepository>();
            services.AddScoped<ISellerWriteRepository, SellerWriteRepository>();

            // User
            services.AddScoped<IUserReadRepository, UserReadRepository>();
            services.AddScoped<IUserWriteRepository, UserWriteRepository>();
        }
    }
}
