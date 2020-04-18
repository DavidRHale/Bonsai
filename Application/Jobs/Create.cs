using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
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
      public string CustomName { get; set; }
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

    public class Handler : RequestHandlerBase, IRequestHandler<Command>
    {
      public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var user = await _userAccessor.GetCurrentUserAsync();

        var bonsai = await GetBonsaiAsync(request.BonsaiId);

        var job = new Job
        {
          Id = request.Id,
          JobType = request.JobType,
          DueBy = request.DueBy,
          CustomName = request.CustomName,
          Bonsai = bonsai,
          BonsaiId = request.BonsaiId,
          AppUser = user,
          AppUserId = user.Id
        };

        _dataContext.Jobs.Add(job);
        await SaveChangesAsync();
        return Unit.Value;
      }
    }
  }
}