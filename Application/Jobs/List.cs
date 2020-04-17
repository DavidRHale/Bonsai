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

        public class Handler : IRequestHandler<Query, List<JobDto>>
        {
            readonly DataContext _context;
            readonly IMapper _mapper;
            readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<JobDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetCurrentUserAsync();
                var jobs = await _context
                    .Jobs
                    .Where(j => j.AppUserId == user.Id)
                    .ToListAsync();

                return _mapper.Map<List<Job>, List<JobDto>>(jobs);
            }
        }
    }
}