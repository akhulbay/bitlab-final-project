package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.model.UserProfile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static java.util.function.Predicate.not;

@Mapper(componentModel = "spring")
public interface UserProfileCreateEditMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "image", target = "image", qualifiedByName = "getImage")
    @Mapping(target = "id", ignore = true)
    UserProfile toEntity(UserProfileCreateEditDto dto);

    @Named("getImage")
    default String getImage(MultipartFile image) {
        return Optional.ofNullable(image)
                .filter(not(MultipartFile::isEmpty))
                .map(MultipartFile::getOriginalFilename)
                .orElse(null);
    }
}
