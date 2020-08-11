using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos
{
  public class Add
  {
    public class Command : IRequest<Photo>
    {
      public IFormFile File { get; set; }
      public Guid BonsaiId { get; set; }
    }

    public class Handler : RequestHandlerBase, IRequestHandler<Command, Photo>
    {
      readonly IPhotoAccessor _photoAccessor;

      public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor, IPhotoAccessor photoAccessor) : base(dataContext, mapper, userAccessor)
      {
        _photoAccessor = photoAccessor;
      }

      public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
      {
        var bonsai = await GetBonsaiAsync(request.BonsaiId);

        var photoUploadResult = _photoAccessor.AddPhoto(request.File);
        var user = await _userAccessor.GetCurrentUserAsync();

        var photo = new Photo
        {
          Url = photoUploadResult.Url,
          Id = photoUploadResult.PublicId,
          BonsaiId = request.BonsaiId,
        };

        if (!user.Photos.Any(p => (p.BonsaiId == request.BonsaiId) && p.IsMain))
        {
          photo.IsMain = true;
        }

        user.Photos.Add(photo);

        var success = await _dataContext.SaveChangesAsync() > 0;

        if (success)
        {
          return photo;
        }

        throw new Exception("Problem saving changes");
      }
    }
  }
}