using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : RequestHandlerBase, IRequestHandler<Command>
        {
            readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor, IPhotoAccessor photoAccessor) : base(dataContext, mapper, userAccessor)
            {
                _photoAccessor = photoAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userAccessor.GetCurrentUserAsync();

                var photo = user.Photos.FirstOrDefault(p => p.Id == request.Id);

                if (photo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not Found" });
                }

                // WRONG - Need to set the IsMain of the BONSAI, not the user
                var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);

                currentMain.IsMain = false;
                photo.IsMain = true;

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