package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.FavoriteJobReadDto;
import kz.shyngys.finalproject.model.FavoriteJob;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FavoriteJobReadMapper {

    FavoriteJobReadDto toDto(FavoriteJob entity);
}
