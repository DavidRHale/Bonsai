using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Bonsais
{
    public class Details
    {
        public class Query : IRequest<Bonsai>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Bonsai>
        {
            readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Bonsai> Handle(Query request, CancellationToken cancellationToken)
            {
                var bonsai = await _dataContext.Bonsais.FindAsync(request.Id);
                return bonsai;
            }
        }

    }
}