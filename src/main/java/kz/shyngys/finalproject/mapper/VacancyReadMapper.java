package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.VacancyReadDto;
import kz.shyngys.finalproject.model.Vacancy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VacancyReadMapper {

    VacancyReadDto toDto(Vacancy entity);
}
