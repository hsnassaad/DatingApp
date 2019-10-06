using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp_Api.Data;
using DatingApp_Api.Dtos;
using DatingApp_Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("userswithroles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await _context.Users
                .OrderBy(x => x.UserName)
                .Select(user => new
                {
                    Id = user.Id,
                    Username = user.UserName,
                    Roles = (from userRole in user.UserRoles
                             join role in _context.Roles
                             on userRole.RoleId
                             equals role.Id
                             select role.Name).ToList()
                }).ToListAsync();

            return Ok(userList);
        }


        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public IActionResult GetPhotosForModeration()
        {
            return Ok("Hello");
        }


        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{username}")]
        public async Task<IActionResult> EditRoles(string username, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(username);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] {};

            var results = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!results.Succeeded)
            {
                return BadRequest("Failed to add to roles");
            }

            results = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!results.Succeeded)
                return BadRequest("Failed to remove roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

    }
}