using System;

namespace Domain
{
    public class Bonsai
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public DateTime DateFirstPlanted { get; set; }

        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}