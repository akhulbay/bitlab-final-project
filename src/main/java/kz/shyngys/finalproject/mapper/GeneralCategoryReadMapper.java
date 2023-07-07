package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.GeneralCategoryReadDto;
import kz.shyngys.finalproject.model.GeneralCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GeneralCategoryReadMapper {

    GeneralCategoryReadDto toDto(GeneralCategory entity);
}
