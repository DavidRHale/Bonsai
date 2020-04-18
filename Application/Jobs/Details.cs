using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Details
    {
        public class Query : IRequest<JobDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, JobDto>
        {
            readonly DataContext _dataContext;
            readonly IMapper _mapper;
            readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<JobDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await _dataContext.Jobs.FindAsync(request.Id);

                if (job == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { job = "Not Found" });
                }

                var user = await _userAccessor.GetCurrentUserAsync();

                if (user == null || job.AppUserId != user.Id)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { user = "Unauthorized" });
                }

                return _mapper.Map<Job, JobDto>(job);
            }
        }
    }
}