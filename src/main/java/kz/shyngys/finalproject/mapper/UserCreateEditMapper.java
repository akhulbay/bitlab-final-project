package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserCreateEditMapper {

    @Mapping(target = "id", ignore = true)
    User toEntity(UserCreateEditDto dto);
}
