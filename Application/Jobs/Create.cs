using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using Domain.Enums;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Jobs
{
  public class Create
  {
    public class Command : IRequest
    {
      public Guid Id { get; set; }
      public JobType JobType { get; set; }
      public DateTime DueBy { get; set; }
      public Guid BonsaiId { get; set; }
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
        var user = await _userAccessor.GetCurrentUserAsync();

        var bonsai = await _dataContext.Bonsais.FindAsync(request.BonsaiId);

        if (bonsai == null)
        {
          throw new RestException(HttpStatusCode.NotFound, new { Bonsai = "Not found" });
        }

        var job = new Job
        {
          Id = request.Id,
          JobType = request.JobType,
          DueBy = request.DueBy,
          Bonsai = bonsai,
          BonsaiId = request.BonsaiId,
          AppUser = user,
          AppUserId = user.Id
        };

        _dataContext.Jobs.Add(job);
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