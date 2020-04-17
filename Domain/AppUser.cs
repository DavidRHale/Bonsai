using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public virtual ICollection<Bonsai> Bonsais { get; set; }
        public virtual ICollection<Job> Jobs { get; set; }
    }
}