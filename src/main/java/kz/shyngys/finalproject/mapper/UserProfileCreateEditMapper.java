package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.model.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserProfileCreateEditMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "accountType", target = "accountType.id")
    @Mapping(target = "image", ignore = true)
    @Mapping(target = "id", ignore = true)
    UserProfile toEntity(UserProfileCreateEditDto dto);
}
