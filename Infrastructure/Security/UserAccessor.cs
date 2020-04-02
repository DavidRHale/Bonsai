using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Security
{
    public class UserAccessor : IUserAccessor
    {
        readonly IHttpContextAccessor _httpContextAccessor;
        readonly UserManager<AppUser> _userManager;

        public UserAccessor(IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUsername()
        {
            return _httpContextAccessor.HttpContext
                .User?
                .Claims?
                .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier) ?
                .Value;
        }

        public async Task<AppUser> GetCurrentUserAsync()
        {
            var userName = GetCurrentUsername();
            return await _userManager.FindByNameAsync(userName);
        }
    }
}