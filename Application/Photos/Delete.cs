using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos
{
  public class Delete
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
          throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not found" });
        }

        if (photo.IsMain)
        {
          throw new RestException(HttpStatusCode.BadRequest, new { Photo = "You cannot delete the main photo for a bonsai" });
        }

        var result = _photoAccessor.DeletePhoto(request.Id);

        if (result == null)
        {
          throw new Exception("Problem deleting the photo");
        }

        _dataContext.Photos.Remove(photo);

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