package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.VacancyCreateEditDto;
import kz.shyngys.finalproject.model.Vacancy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VacancyCreateEditMapper {

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(target = "id", ignore = true)
    Vacancy toEntity(VacancyCreateEditDto dto);
}
