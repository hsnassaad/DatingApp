﻿using AutoMapper;
using DatingApp_Api.Dtos;
using DatingApp_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp_Api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {

                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }).ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateOfBirth.CalculateAge());
            });

            CreateMap<User, UserForDetailedDto>().ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }).ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(d => d.DateOfBirth.CalculateAge());
            });


            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotosForViewDto>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<MessageForCreationDto, Message>().ReverseMap();

            CreateMap<Message, MessageForReturnDto>()
                .ForMember(sender => sender.SenderPhotoUrl, opt =>opt.MapFrom(u=>u.Sender.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(recipient => recipient.RecipientPhotoUrl, opt =>opt.MapFrom(u=>u.Recipient.Photos.FirstOrDefault(p=>p.IsMain).Url));

        }

    }
}
