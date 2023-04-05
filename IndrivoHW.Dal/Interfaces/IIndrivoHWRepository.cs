using IndrivoHW.Domain;
using IndrivoHW.Domain.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Dal.Interfaces
{
     public interface IIndrivoHWRepository   
     {
          Task<List<TEntity>> GetAllAsync<TEntity>() where TEntity : class;
          void Create<TEntity>(TEntity entity) where TEntity : BaseEntity;
          Task SaveChangesAsync();
          Task<TEntity> GetByIdAsync<TEntity>(int id) where TEntity : class;
     }
}
