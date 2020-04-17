using System;
using System.Text.Json.Serialization;
using Domain.Enums;

namespace Application.Jobs
{
    public class JobDto
    {
        public Guid Id { get; set; }
        public JobType JobType { get; set; }
        public DateTime DueBy { get; set; }
        public string CustomName { get; set; }
        public Guid BonsaiId { get; set; }
    }
}