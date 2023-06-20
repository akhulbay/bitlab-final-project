package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserReadMapper {

    UserReadDto toDto(User entity);
}
