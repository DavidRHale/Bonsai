using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Bonsais
{
    public class Create
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
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor)
            { }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetCurrentUserAsync();

                var dateFirstPlanted = request.Age == null ? DateTime.MinValue : DateTime.Now.AddYears(request.Age.Value * -1);

                var bonsai = new Bonsai
                {
                    Id = request.Id,
                    Name = request.Name,
                    Species = request.Species,
                    DateFirstPlanted = dateFirstPlanted,
                    AppUser = user,
                    AppUserId = user.Id
                };

                _dataContext.Bonsais.Add(bonsai);
                await SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}