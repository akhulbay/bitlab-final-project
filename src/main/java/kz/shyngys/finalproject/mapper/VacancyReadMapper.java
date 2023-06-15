package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.dto.VacancyReadDto;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.model.Vacancy;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VacancyReadMapper implements Mapper<Vacancy, VacancyReadDto> {

    private CompanyReadMapper companyReadMapper;

    @Autowired
    public void setCompanyReadMapper(CompanyReadMapper companyReadMapper) {
        this.companyReadMapper = companyReadMapper;
    };

    @Override
    public VacancyReadDto map(Vacancy object) {
        return new VacancyReadDto(
                object.getId(),
                object.getName(),
                object.getStartingSalary(),
                object.getCity(),
                object.getResponsibilities(),
                object.getRequirements(),
                object.getConditions(),
                object.getWorkSchedule(),
                object.getKeySkills(),
                object.getCreatedAt(),
                getCompanyDto(object.getCompany())
        );
    }

    private CompanyReadDto getCompanyDto(Company company) {
        return companyReadMapper.map(company);
    }
}
