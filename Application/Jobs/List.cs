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

namespace Application.Jobs
{
    public class List
    {
        public class Query : IRequest<List<JobDto>> { }

        public class Handler : RequestHandlerBase, IRequestHandler<Query, List<JobDto>>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<List<JobDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetCurrentUserAsync();
                var jobs = await _dataContext
                    .Jobs
                    .Where(j => j.AppUserId == user.Id)
                    .ToListAsync();

                return _mapper.Map<List<Job>, List<JobDto>>(jobs);
            }
        }
    }
}