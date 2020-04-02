using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Bonsais
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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

                _dataContext.Remove(bonsai);
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