using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bonsais
{
    public class List
    {
        public class Query : IRequest<List<BonsaiDto>> { }

        public class Handler : IRequestHandler<Query, List<BonsaiDto>>
        {
            readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<BonsaiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bonsais = await _context.Bonsais.ToListAsync();

                var dtos = new List<BonsaiDto>();

                foreach (var bonsai in bonsais)
                {
                    int? age = null;
                    if (bonsai.DateFirstPlanted != DateTime.MinValue)
                    {
                        age = DateTime.Now.Year - bonsai.DateFirstPlanted.Year;
                    }

                    var dto = new BonsaiDto
                    {
                        Id = bonsai.Id,
                        Name = bonsai.Name,
                        Species = bonsai.Species,
                        Age = age
                    };

                    dtos.Add(dto);
                }

                return dtos;
            }
        }
    }
}