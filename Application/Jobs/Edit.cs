using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
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

        public class Handler : IRequestHandler<Command>
        {
            readonly DataContext _dataContext;
            readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var job = await _dataContext.Jobs.FindAsync(request.Id);

                if (job == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { job = "Not Found" });
                }

                var user = await _userAccessor.GetCurrentUserAsync();

                if (user == null || user.Id != job.AppUserId)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { user = "Unauthorized " });
                }

                job.JobType = request.JobType ?? job.JobType;
                job.DueBy = request.DueBy ?? job.DueBy;
                job.BonsaiId = request.BonsaiId ?? job.BonsaiId;
                job.CustomName = request.CustomName ?? job.CustomName;

                var success = await _dataContext.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving changes");
            }
        }
    }
}