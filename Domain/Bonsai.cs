using System;
using System.Collections.Generic;
using Domain.Interfaces;

namespace Domain
{
    public class Bonsai : IUserOwned
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public DateTime DateFirstPlanted { get; set; }

        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}