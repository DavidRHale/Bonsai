using System;
using System.Threading;
using System.Threading.Tasks;
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
                var bonsai = await _dataContext.Bonsais.FindAsync(request.Id);

                if (bonsai == null)
                {
                    throw new Exception("Could not find bonsai");
                }

                bonsai.Name = request.Name ?? bonsai.Name;
                bonsai.Species = request.Species ?? bonsai.Species;

                if (request.Age != null)
                {
                    var newAge = DateTime.Now.AddYears(request.Age.Value * -1);
                    bonsai.DateFirstPlanted = newAge;
                }

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