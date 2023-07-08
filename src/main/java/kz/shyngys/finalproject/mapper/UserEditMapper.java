package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserEditDto;
import kz.shyngys.finalproject.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserEditMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "username", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    User toEntity(UserEditDto dto);
}
