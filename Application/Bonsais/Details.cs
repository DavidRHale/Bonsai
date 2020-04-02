using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bonsais
{
    public class Details
    {
        public class Query : IRequest<BonsaiDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BonsaiDto>
        {
            readonly DataContext _dataContext;
            readonly IMapper _mapper;
            readonly IUserAccessor _userAccessor;

            public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _dataContext = dataContext;
                _mapper = mapper;
            }

            public async Task<BonsaiDto> Handle(Query request, CancellationToken cancellationToken)
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

                // int? age = null;
                // if (bonsai.DateFirstPlanted != DateTime.MinValue)
                // {
                //     age = DateTime.Now.Year - bonsai.DateFirstPlanted.Year;
                // }

                var dto = _mapper.Map<Bonsai, BonsaiDto>(bonsai);

                return dto;
            }
        }

    }
}