package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.BlogCreateEditDto;
import kz.shyngys.finalproject.model.Blog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static java.util.function.Predicate.not;

@Mapper(componentModel = "spring")
public interface BlogCreateEditMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "blogCategoryId", target = "blogCategory.id")
    @Mapping(source = "image", target = "image", qualifiedByName = "getImage")
    Blog toEntity(BlogCreateEditDto dto);

    @Named("getImage")
    default String getImage(MultipartFile image) {
        return Optional.ofNullable(image)
                .filter(not(MultipartFile::isEmpty))
                .map(MultipartFile::getOriginalFilename)
                .orElse(null);
    }
}
