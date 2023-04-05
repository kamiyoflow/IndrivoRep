using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Common.Dtos.LoginHistory
{
     public class LoginHistoryDto
     {
          public string UserName { get; set; }
          public string UserId { get; set; }
          public DateTime LoggedIn { get; set; }
     }
}
