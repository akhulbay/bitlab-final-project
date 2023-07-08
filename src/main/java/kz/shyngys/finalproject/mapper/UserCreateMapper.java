package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserCreateDto;
import kz.shyngys.finalproject.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserCreateMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "blocked", ignore = true)
    User toEntity(UserCreateDto dto);
}
