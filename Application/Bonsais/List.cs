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
        public class Query : IRequest<List<Bonsai>> { }

        public class Handler : IRequestHandler<Query, List<Bonsai>>
        {
            readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Bonsai>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bonsais = await _context.Bonsais.ToListAsync();
                return bonsais;
            }
        }
    }
}