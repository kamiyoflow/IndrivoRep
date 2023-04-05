using IndrivoHW.Dal.EntityConfiguration;
using IndrivoHW.Domain;
using IndrivoHW.Domain.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Dal
{
     public class IndrivoHWDbContext : IdentityDbContext<User, Role, int>
     {
          public IndrivoHWDbContext(DbContextOptions<IndrivoHWDbContext> options) : base(options)
          { }

          public DbSet<LoginHistory> LoginHistories { get; set; }

          protected override void OnModelCreating(ModelBuilder builder)
          {
               builder.ApplyConfiguration(new RoleConfiguration());

               base.OnModelCreating(builder);
          }
     }
}
