using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Common.Dtos.Account
{
     public class AccountForLoginDto
     {

          [Required]
          public string UserName { get; set; }

          [Required]
          public string Password { get; set; }
     }
}
