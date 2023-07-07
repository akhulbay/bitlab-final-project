package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.BlogReadDto;
import kz.shyngys.finalproject.model.Blog;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlogReadMapper {

    BlogReadDto toDto(Blog entity);
}
