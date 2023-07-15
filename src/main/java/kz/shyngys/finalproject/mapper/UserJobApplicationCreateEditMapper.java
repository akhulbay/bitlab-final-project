package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserJobApplicationCreateEditDto;
import kz.shyngys.finalproject.model.UserJobApplication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserJobApplicationCreateEditMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "userProfile", ignore = true)
    @Mapping(target = "job", ignore = true)
    UserJobApplication toEntity(UserJobApplicationCreateEditDto dto);
}
