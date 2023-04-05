using AutoMapper;
using IndrivoHW.Common.Dtos.Account;
using IndrivoHW.Domain.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Bll.Profiles
{
     public class AccountProfile : Profile
     {
          public AccountProfile()
          {
               CreateMap<AccountForRegistrationDto, User>();
               CreateMap<User, AccountDtoList>();
               CreateMap<AccountForUpdateDto, User>();
          }
     }
}
