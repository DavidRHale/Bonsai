using AutoMapper;
using Domain;

namespace Application.Bonsais
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Bonsai, BonsaiDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(b => b.AppUser.Email))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(b => b.AppUser.UserName));
        }
    }
}