package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.FavoriteJobCreateEditDto;
import kz.shyngys.finalproject.model.FavoriteJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FavoriteJobCreateEditMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "job", ignore = true)
    FavoriteJob toEntity(FavoriteJobCreateEditDto dto);
}
