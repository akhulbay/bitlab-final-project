package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.model.Company;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static java.util.function.Predicate.not;

@Mapper(componentModel = "spring")
public interface CompanyCreateEditMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "id", ignore = true)
    Company toEntity(CompanyCreateEditDto dto);
}
