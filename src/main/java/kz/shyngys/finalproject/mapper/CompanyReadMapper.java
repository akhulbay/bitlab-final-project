package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.model.Company;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CompanyReadMapper {

    CompanyReadDto toDto(Company entity);
}
