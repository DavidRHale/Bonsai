using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Jobs;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class JobsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<JobDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}