using System;
using Domain.Enums;

namespace Domain
{
    public class Job
    {
        public Guid Id { get; set; }
        public JobType JobType { get; set; }
        public DateTime DueBy { get; set; }
        public string CustomName { get; set; }

        public Guid BonsaiId { get; set; }
        public virtual Bonsai Bonsai { get; set; }

        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
    }
}