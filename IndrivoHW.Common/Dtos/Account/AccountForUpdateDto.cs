﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Common.Dtos.Account
{
     public class AccountForUpdateDto
     {
          public string UserName { get; set; }
          public int Age { get; set; }
          public string Password { get; set; }
          public string Email { get; set; }
     }
}
