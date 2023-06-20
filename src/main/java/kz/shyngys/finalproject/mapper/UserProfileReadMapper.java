package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserProfileReadDto;
import kz.shyngys.finalproject.model.UserProfile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserProfileReadMapper {

    UserProfileReadDto toDto(UserProfile entity);
}
