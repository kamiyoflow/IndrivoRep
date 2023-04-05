using AutoMapper;
using IndrivoHW.Common.Dtos.Account;
using IndrivoHW.Dal.Interfaces;
using IndrivoHW.Domain;
using IndrivoHW.Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IndrivoHW.API.Controllers
{
     [Route("api/account")]
     public class AccountController : AppBaseController
     {
          private readonly UserManager<User> _userManager;
          private readonly SignInManager<User> _signInManager;
          private readonly ILogger<AccountController> _logger;
          private readonly IMapper _mapper;
          private readonly IIndrivoHWRepository _indrivoHWRepository;

          public AccountController(UserManager<User> userManager, SignInManager<User> signInManager,
               ILogger<AccountController> logger, IMapper mapper, IIndrivoHWRepository indrivoHWRepository)
          {
               _userManager = userManager;
               _signInManager = signInManager;
               _logger = logger;
               _mapper = mapper;
               _indrivoHWRepository = indrivoHWRepository;
          }

          [AllowAnonymous]
          [HttpPost("register")]
          public async Task<IActionResult> Register([FromBody] AccountForRegistrationDto userDto)
          {
               _logger.LogInformation($"Registration attempt for {userDto.Email}");

               var user = _mapper.Map<User>(userDto);
               var result = await _userManager.CreateAsync(user, userDto.Password);

               if (!result.Succeeded)
               {
                    return BadRequest("User registration failed.");
               }
               await _userManager.AddToRoleAsync(user, userDto.Role);

               return Accepted();
          }

          [AllowAnonymous]
          [HttpPost("login")]
          public async Task<IActionResult> Login(AccountForLoginDto userForLoginDto)
          {
               var checkingPasswordResult = await _signInManager.PasswordSignInAsync(userForLoginDto.UserName, userForLoginDto.Password, false, false);

               if (!checkingPasswordResult.Succeeded)
               {
                    return Unauthorized(userForLoginDto);
               }
               var user = await _userManager.FindByNameAsync(userForLoginDto.UserName);
               var history = _mapper.Map<LoginHistory>(userForLoginDto);
               history.UserId = user.Id;
               history.LoggedIn = DateTime.Now;
               _indrivoHWRepository.Create(history);
               await _indrivoHWRepository.SaveChangesAsync();
               return Accepted();
          }

     }
}
