using AutoMapper;
using Domain;

namespace Application.Bonsais
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Bonsai, BonsaiDto>();
        }
    }
}