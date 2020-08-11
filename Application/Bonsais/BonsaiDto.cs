using System;
using System.Collections.Generic;
using Application.Jobs;
using Domain;

namespace Application.Bonsais
{
    public class BonsaiDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public int EstimatedAge { get; set; }
        public string PotType { get; set; }
        public string Design { get; set; }

        public List<JobDto> Jobs { get; set; }
        public List<Photo> Photos { get; set; }
    }
}