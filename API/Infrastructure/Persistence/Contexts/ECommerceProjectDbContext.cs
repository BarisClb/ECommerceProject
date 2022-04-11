using Domain.Entities;
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
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server = (localdb)\mssqllocaldb; Database = ECommerceProjectDB; Trusted_Connection = true;");
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        // public DbSet<Like> Likes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<User> Users { get; set; }

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

            //// Like

            // modelBuilder.Entity<Like>()

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
