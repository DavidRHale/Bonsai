using System;
using System.Collections.Generic;
using Application.Jobs;

namespace Application.Bonsais
{
    public class BonsaiDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public List<JobDto> Jobs { get; set; }
    }
}