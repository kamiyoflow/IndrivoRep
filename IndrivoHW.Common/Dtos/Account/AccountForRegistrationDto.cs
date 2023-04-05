using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IndrivoHW.Common.Dtos.Account
{
     public class AccountForRegistrationDto
     {

          [Required]
          [MaxLength(30)]
          [MinLength(2)]
          public string UserName { get; set; }

          [Required]
          public int Age { get; set; }

          public string Role { get; set; }

          [Required]
          [MaxLength(30)]
          [MinLength(8)]
          public string Password { get; set; }

          [Required]
          [EmailAddress]
          [MinLength(8)]
          [MaxLength(50)]
          public string Email { get; set; }
     }
}
