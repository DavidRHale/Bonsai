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
        public class Query : IRequest<BonsaiDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BonsaiDto>
        {
            readonly DataContext _dataContext;
            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<BonsaiDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var bonsai = await _dataContext.Bonsais.FindAsync(request.Id);

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

                return dto;
            }
        }

    }
}