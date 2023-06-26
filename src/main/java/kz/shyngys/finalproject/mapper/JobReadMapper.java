package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.JobReadDto;
import kz.shyngys.finalproject.model.Job;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JobReadMapper {

    JobReadDto toDto(Job entity);
}
