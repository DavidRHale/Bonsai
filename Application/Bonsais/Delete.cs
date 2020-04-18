using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
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

        public class Handler : RequestHandlerBase, IRequestHandler<Command>
        {
            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor) : base(dataContext, mapper, userAccessor) { }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var bonsai = await GetBonsaiAsync(request.Id);
                await CheckEntityIsOwnedByCurrentUser(bonsai);

                _dataContext.Remove(bonsai);
                await SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}