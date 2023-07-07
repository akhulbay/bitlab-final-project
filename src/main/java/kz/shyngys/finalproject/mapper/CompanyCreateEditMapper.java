package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.model.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CompanyCreateEditMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "id", ignore = true)
    Company toEntity(CompanyCreateEditDto dto);
}
