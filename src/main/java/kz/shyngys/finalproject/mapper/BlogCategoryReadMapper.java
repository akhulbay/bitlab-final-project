package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.BlogCategoryReadDto;
import kz.shyngys.finalproject.model.BlogCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlogCategoryReadMapper {

    BlogCategoryReadDto toDto(BlogCategory entity);
}
