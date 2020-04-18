using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Bonsais
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string Species { get; set; }
            public int? Age { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Name).NotEmpty();
                RuleFor(x => x.Species).NotEmpty();
                RuleFor(x => x.Age).NotEmpty();
            }
        }

        public class Handler : RequestHandlerBase, IRequestHandler<Command>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {

                var bonsai = await GetBonsaiAsync(request.Id);
                await CheckEntityIsOwnedByCurrentUser(bonsai);

                bonsai.Name = request.Name ?? bonsai.Name;
                bonsai.Species = request.Species ?? bonsai.Species;

                await SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}