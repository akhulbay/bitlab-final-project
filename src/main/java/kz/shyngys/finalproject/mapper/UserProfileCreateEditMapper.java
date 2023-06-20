package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.model.UserProfile;
import kz.shyngys.finalproject.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface UserProfileCreateEditMapper {

    @Mapping(target = "user.id", source = "userId")
    UserProfile toEntity(UserProfileCreateEditDto dto);
}
