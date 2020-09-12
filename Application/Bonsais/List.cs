using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bonsais
{
    public class List
    {
        public class BonsaiEnvelope
        {
            public List<BonsaiDto> Bonsais { get; set; }
            public int BonsaiCount { get; set; }
        }

        public class Query : IRequest<BonsaiEnvelope>
        {
            public int? Limit { get; set; }
            public int? Offset { get; set; }

            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
        }

        public class Handler : RequestHandlerBase, IRequestHandler<Query, BonsaiEnvelope>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<BonsaiEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetCurrentUserAsync();

                var queriable = _dataContext.Bonsais.AsQueryable();
                var userBonsaisQueriable = queriable.Where(b => b.AppUserId == user.Id);

                var bonsais = await userBonsaisQueriable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync();

                return new BonsaiEnvelope
                {
                    Bonsais = _mapper.Map<List<Bonsai>, List<BonsaiDto>>(bonsais),
                        BonsaiCount = userBonsaisQueriable.Count()
                };
            }
        }
    }
}