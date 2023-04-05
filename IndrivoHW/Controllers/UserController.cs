using AutoMapper;
using IndrivoHW.Common.Dtos.Account;
using IndrivoHW.Dal.Interfaces;
using IndrivoHW.Domain.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IndrivoHW.API.Controllers
{
     [Route("api/users")]
     public class UserController : AppBaseController
     {
          private readonly IIndrivoHWRepository _indrivoHWRepository;
          private readonly IMapper _mapper;
          private readonly UserManager<User> _userManager;

          public UserController(IIndrivoHWRepository indrivoHWRepository, IMapper mapper, UserManager<User> userManager)
          {
               _indrivoHWRepository = indrivoHWRepository;
               _mapper = mapper;
               _userManager = userManager;
          }

          [Authorize(Roles = "Admin")]
          [HttpGet]
          public async Task<List<AccountDtoList>> GetAllUsers()
          {
               var accountList = await _indrivoHWRepository.GetAllAsync<User>();

               var accountListDto = new List<AccountDtoList>();
               foreach (var account in accountList)
               {
                    accountListDto.Add(_mapper.Map<AccountDtoList>(account));
               }
                    
               return accountListDto;
          }
          [Authorize(Roles = "Admin, User")]
          [HttpPut("settings/{id}")]
          public async Task<IActionResult> UpdateUser(string id, AccountForUpdateDto accountDto)
          {
               var user = await _userManager.FindByIdAsync(id);

               user = _mapper.Map(accountDto, user);
               await _indrivoHWRepository.SaveChangesAsync();
               return Ok();
          }

     }
}
