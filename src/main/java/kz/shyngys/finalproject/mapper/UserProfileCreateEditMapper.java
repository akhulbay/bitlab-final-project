package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.model.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserProfileCreateEditMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "accountType", ignore = true)
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "id", ignore = true)
    UserProfile toEntity(UserProfileCreateEditDto dto);
}
