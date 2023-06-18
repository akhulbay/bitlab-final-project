package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserCreateEditMapper {

    User toEntity(UserCreateEditDto userDto);
}
