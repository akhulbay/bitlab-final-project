package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.VacancyCreateEditDto;
import kz.shyngys.finalproject.model.Vacancy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static java.util.function.Predicate.not;

@Mapper(componentModel = "spring")
public interface VacancyCreateEditMapper {

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(target = "id", ignore = true)
    Vacancy toEntity(VacancyCreateEditDto dto);
}
