package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserJobApplicationReadDto;
import kz.shyngys.finalproject.model.UserJobApplication;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserJobApplicationReadMapper {

    UserJobApplicationReadDto toDto(UserJobApplication entity);
}
