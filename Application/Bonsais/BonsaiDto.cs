using System;

namespace Application.Bonsais
{
    public class BonsaiDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Species { get; set; }
        public int? Age { get; set; }

        public string UserName { get; set; } // TODO remove this
        public string Email { get; set; } // TODO remove this
    }
}