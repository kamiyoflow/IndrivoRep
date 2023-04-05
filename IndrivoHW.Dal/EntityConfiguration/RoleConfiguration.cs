using IndrivoHW.Domain.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace IndrivoHW.Dal.EntityConfiguration
{
     public class RoleConfiguration : IEntityTypeConfiguration<Role>
     {
          public void Configure(EntityTypeBuilder<Role> builder)
          {
               builder.HasData(
                    new Role
                    {
                         Id = 1,
                         Name = "User",
                         NormalizedName = "USER"
                    },
                    new Role
                    {
                         Id = 2,
                         Name = "Admin",
                         NormalizedName = "ADMIN"
                    }); ;
          }
     }
}
