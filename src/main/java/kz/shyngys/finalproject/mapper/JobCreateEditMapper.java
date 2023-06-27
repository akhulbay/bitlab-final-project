package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.JobCreateEditDto;
import kz.shyngys.finalproject.model.Job;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDate;

@Mapper(componentModel = "spring")
public interface JobCreateEditMapper {

    @Mapping(source = "companyId", target = "company.id")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    Job toEntity(JobCreateEditDto dto);
}
