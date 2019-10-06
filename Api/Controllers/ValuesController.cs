using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ValuesController : ControllerBase
  {
    readonly DataContext _dataContext;
    public ValuesController(DataContext dataContext)
    {
      _dataContext = dataContext;
    }

    // GET api/values
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Value>>> Get()
    {
      var values = await _dataContext.Values.ToListAsync();
      return Ok(values);
    }
  }
}