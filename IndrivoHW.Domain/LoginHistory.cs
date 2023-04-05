using IndrivoHW.Domain.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Domain
{
     public class LoginHistory : BaseEntity
     {
          public string UserName { get; set; }
          public DateTime LoggedIn { get; set; }
          public int UserId { get; set; }
          public User User { get; set; }
     }
}
