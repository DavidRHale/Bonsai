using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
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
            public int Age { get; set; }
        }

        // TODO: Add Fluent Validation and implement this
        // public class CommandValidator : AbstractValidator<Command>
        // {
        //     public CommandValidator()
        //     {
        //         RuleFor(x => x.Title).NotEmpty();
        //         RuleFor(x => x.Description).NotEmpty();
        //         RuleFor(x => x.Category).NotEmpty();
        //         RuleFor(x => x.Date).NotEmpty();
        //         RuleFor(x => x.City).NotEmpty();
        //         RuleFor(x => x.Venue).NotEmpty();
        //     }
        // }

        public class Handler : IRequestHandler<Command>
        {
            readonly DataContext _dataContext;

            public Handler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bonsai = new Bonsai
                {
                    Id = request.Id,
                    Name = request.Name,
                    Species = request.Species,
                    DateFirstPlanted = DateTime.Now.AddYears(request.Age * -1)
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