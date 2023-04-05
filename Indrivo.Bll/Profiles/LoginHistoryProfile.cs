using AutoMapper;
using IndrivoHW.Common.Dtos.Account;
using IndrivoHW.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Bll.Profiles
{
     public class LoginHistoryProfile : Profile
     {
          public LoginHistoryProfile()
          {
               CreateMap<AccountForLoginDto, LoginHistory>(MemberList.None);
          }
     }
}
