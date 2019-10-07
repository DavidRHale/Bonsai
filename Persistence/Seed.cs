using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext dataContext)
        {
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