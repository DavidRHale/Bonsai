using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext dataContext, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                    DisplayName = "Bob",
                    UserName = "bob",
                    Email = "bob@test.com"
                    },
                    new AppUser
                    {
                    DisplayName = "Tom",
                    UserName = "tom",
                    Email = "tom@test.com"
                    },
                    new AppUser
                    {
                    DisplayName = "Jane",
                    UserName = "jane",
                    Email = "jane@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "P@ssw0rd");
                }
            }

            if (!dataContext.Bonsais.Any())
            {
                var bonsais = new List<Bonsai>
                {
                    new Bonsai
                    {
                    Name = "Big Larch",
                    Species = "Larch",
                    DateFirstPlanted = DateTime.Now.AddYears(-20),
                    },
                    new Bonsai
                    {
                    Name = "Bendy Scott",
                    Species = "Scots pine",
                    DateFirstPlanted = DateTime.Now.AddYears(-5),
                    },
                    new Bonsai
                    {
                    Name = "Upright Juniper",
                    Species = "Procumbens Juniper",
                    DateFirstPlanted = DateTime.Now.AddYears(-30),
                    },
                };

                dataContext.Bonsais.AddRange(bonsais);
                dataContext.SaveChanges();
            }
        }
    }
}