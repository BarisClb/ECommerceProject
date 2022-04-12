using Domain.Entities;
using Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Contexts
{
    public class ECommerceProjectDbContext : DbContext
    {
        public ECommerceProjectDbContext(DbContextOptions options) : base(options) 
        { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<User> Users { get; set; }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var datas = ChangeTracker.Entries<BaseEntity>();

            foreach (var data in datas)
            {
                if (data.State == EntityState.Added)
                {
                    data.Entity.DateCreated = DateTime.UtcNow;
                }
                if (data.State == EntityState.Modified)
                {
                    data.Entity.DateUpdated = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //// Category

            //modelBuilder.Entity<Category>()
            //    .HasMany(c => c.Products)
            //    .WithOne(p => p.Category)
            //    .OnDelete(DeleteBehavior.Cascade);

            //// Comment

            //modelBuilder.Entity<Comment>()
            //    .HasOne(c => c.WrittenBy)
            //    .WithMany(u => u.Comments)
            //    .OnDelete(DeleteBehavior.NoAction);

            // Like

            modelBuilder.Entity<Like>()
                .HasOne(l => l.LikedBy)
                .WithMany(u => u.Likes)
                .OnDelete(DeleteBehavior.NoAction);

            //// Order

            //modelBuilder.Entity<Order>()
            //    .HasOne(o => o.OrderedBy)
            //    .WithMany(u => u.Orders)
            //    .OnDelete(DeleteBehavior.NoAction);

            //// Product

            //modelBuilder.Entity<Product>()
            //    .HasOne(p => p.CreatedBy)
            //    .WithMany(u => u.Products)
            //    .OnDelete(DeleteBehavior.NoAction);

            //// Seller

            // modelBuilder.Entity<Seller>()

            //// User

            //modelBuilder.Entity<User>()

        }

    }

}
