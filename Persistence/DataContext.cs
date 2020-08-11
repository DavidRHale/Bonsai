using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Bonsai> Bonsais { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Bonsai>()
                .HasOne(b => b.AppUser)
                .WithMany(u => u.Bonsais)
                .HasForeignKey(b => b.AppUserId);

            builder.Entity<Job>()
                .HasOne(b => b.AppUser)
                .WithMany(u => u.Jobs)
                .HasForeignKey(b => b.AppUserId);

            builder.Entity<Job>()
                .HasOne(j => j.Bonsai)
                .WithMany(b => b.Jobs)
                .HasForeignKey(j => j.BonsaiId);

            builder.Entity<Photo>()
                .HasOne(p => p.AppUser)
                .WithMany(u => u.Photos)
                .HasForeignKey(p => p.AppUserId);

            builder.Entity<Photo>()
                .HasOne(p => p.Bonsai)
                .WithMany(b => b.Photos)
                .HasForeignKey(p => p.BonsaiId);
        }
    }
}