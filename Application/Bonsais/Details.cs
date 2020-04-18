using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
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

        public class Handler : RequestHandlerBase, IRequestHandler<Query, BonsaiDto>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<BonsaiDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var bonsai = await GetBonsaiAsync(request.Id);
                await CheckEntityIsOwnedByCurrentUser(bonsai);

                var dto = _mapper.Map<Bonsai, BonsaiDto>(bonsai);

                return dto;
            }
        }

    }
}