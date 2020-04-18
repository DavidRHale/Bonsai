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

        public class Handler : RequestHandlerBase, IRequestHandler<Query, JobDto>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<JobDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var job = await _dataContext.Jobs.FindAsync(request.Id);

                if (job == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { job = "Not Found" });
                }

                await CheckEntityIsOwnedByCurrentUser(job);

                return _mapper.Map<Job, JobDto>(job);
            }
        }
    }
}