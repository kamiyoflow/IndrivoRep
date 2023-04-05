using AutoMapper;
using IndrivoHW.Dal.Interfaces;
using IndrivoHW.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Dal.Repositories
{
     public class IndrivoHWRepository : IIndrivoHWRepository
     {
          private readonly IndrivoHWDbContext _indrivoHWDbContext;

          public IndrivoHWRepository(IndrivoHWDbContext indrivoHWDbContext)
          {
               _indrivoHWDbContext = indrivoHWDbContext;
          }

          public async Task<List<TEntity>> GetAllAsync<TEntity>() where TEntity : class
          {
               return await _indrivoHWDbContext.Set<TEntity>().ToListAsync();
          }

          public void Create<TEntity>(TEntity entity) where TEntity : BaseEntity
          {
               _indrivoHWDbContext.Set<TEntity>().Add(entity);
          }
          public async Task SaveChangesAsync()
          {
               await _indrivoHWDbContext.SaveChangesAsync();
          }

          public async Task<TEntity> GetByIdAsync<TEntity>(int id) where TEntity : class
          {
               return await _indrivoHWDbContext.FindAsync<TEntity>(id);
          }
               
     }
}
