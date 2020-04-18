using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain.Enums;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Jobs
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public JobType? JobType { get; set; }
            public DateTime? DueBy { get; set; }
            public Guid? BonsaiId { get; set; }
            public string CustomName { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.JobType).NotEmpty();
                RuleFor(x => x.DueBy).NotEmpty();
                RuleFor(x => x.BonsaiId).NotEmpty();
            }
        }

        public class Handler : RequestHandlerBase, IRequestHandler<Command>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await GetJobAsync(request.Id);
                await CheckEntityIsOwnedByCurrentUser(job);

                var bonsaiId = request.BonsaiId ?? job.BonsaiId;
                await GetBonsaiAsync(bonsaiId);
                job.BonsaiId = bonsaiId;

                job.JobType = request.JobType ?? job.JobType;
                job.DueBy = request.DueBy ?? job.DueBy;
                job.CustomName = request.CustomName ?? job.CustomName;

                await SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}