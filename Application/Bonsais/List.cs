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
        public class Query : IRequest<List<BonsaiDto>> { }

        public class Handler : RequestHandlerBase, IRequestHandler<Query, List<BonsaiDto>>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<List<BonsaiDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetCurrentUserAsync();
                var bonsais = await _dataContext
                    .Bonsais
                    .Where(b => b.AppUserId == user.Id)
                    .ToListAsync();

                return _mapper.Map<List<Bonsai>, List<BonsaiDto>>(bonsais);
            }
        }
    }
}