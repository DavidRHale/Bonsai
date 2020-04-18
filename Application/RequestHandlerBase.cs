using System;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Domain.Interfaces;
using Persistence;

namespace Application
{
    public abstract class RequestHandlerBase
    {
        protected readonly DataContext _dataContext;
        protected readonly IMapper _mapper;
        protected readonly IUserAccessor _userAccessor;

        public RequestHandlerBase(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task CheckEntityIsOwnedByCurrentUser(IUserOwned entity)
        {
            var user = await _userAccessor.GetCurrentUserAsync();

            if (user == null || entity.AppUserId != user.Id)
            {
                throw new RestException(HttpStatusCode.Unauthorized, new { user = "Unauthorized" });
            }
        }

        public async Task SaveChangesAsync()
        {
            var success = true;

            try
            {
                success = await _dataContext.SaveChangesAsync() > 0;
            }
            catch (System.Exception)
            {
                success = false;
                // TODO Logging
            }

            if (!success)
            {
                throw new Exception("Problem saving changes");
            }
        }

        public async Task<Bonsai> GetBonsaiAsync(Guid id)
        {
            var bonsai = await _dataContext.Bonsais.FindAsync(id);

            if (bonsai == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { bonsai = "Not Found" });
            }
            return bonsai;
        }

        public async Task<Job> GetJobAsync(Guid id)
        {
            var job = await _dataContext.Jobs.FindAsync(id);

            if (job == null)
            {
                throw new RestException(HttpStatusCode.NotFound, new { job = "Not Found" });
            }

            return job;
        }
    }
}