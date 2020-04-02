using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
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
                var bonsai = await _dataContext.Bonsais.FindAsync(request.Id);

                if (bonsai == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { bonsai = "Not Found" });
                }

                var user = await _userAccessor.GetCurrentUserAsync();

                if (user == null || bonsai.AppUserId != user.Id)
                {
                    throw new RestException(HttpStatusCode.Unauthorized, new { user = "Unauthorized" });
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