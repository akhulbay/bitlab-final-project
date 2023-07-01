package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.FavoriteJobCreateEditDto;
import kz.shyngys.finalproject.model.FavoriteJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FavoriteJobCreateEditMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "jobId", target = "job.id")
    FavoriteJob toEntity(FavoriteJobCreateEditDto dto);
}
