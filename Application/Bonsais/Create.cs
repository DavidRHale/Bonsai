using System;
using System.Threading;
using System.Threading.Tasks;
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

        public class Handler : IRequestHandler<Command>
        {
            readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var dateFirstPlanted = request.Age == null ? DateTime.MinValue : DateTime.Now.AddYears(request.Age.Value * -1);

                var bonsai = new Bonsai
                {
                    Id = request.Id,
                    Name = request.Name,
                    Species = request.Species,
                    DateFirstPlanted = dateFirstPlanted
                };

                _dataContext.Bonsais.Add(bonsai);
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