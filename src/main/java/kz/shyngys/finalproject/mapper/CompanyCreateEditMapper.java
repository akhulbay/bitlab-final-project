package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.model.Company;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static java.util.function.Predicate.*;

@Component
public class CompanyCreateEditMapper implements Mapper<CompanyCreateEditDto, Company>{

    @Override
    public Company map(CompanyCreateEditDto object) {
        Company company = new Company();
        copy(object, company);

        return company;
    }

    @Override
    public Company map(CompanyCreateEditDto fromObject, Company toObject) {
        copy(fromObject, toObject);

        return toObject;
    }

    private void copy(CompanyCreateEditDto object, Company company) {
        company.setName(object.getName());
        company.setEmail(object.getEmail());
        company.setLocation(object.getLocation());

        Optional.ofNullable(object.getImage())
                .filter(not(MultipartFile::isEmpty))
                .ifPresent(image -> company.setImage(image.getOriginalFilename()));
    }
}
