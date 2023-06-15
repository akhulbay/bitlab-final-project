package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.dto.VacancyReadDto;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.model.Vacancy;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CompanyReadMapper implements Mapper<Company, CompanyReadDto> {

    private UserReadMapper userReadMapper;
    private VacancyReadMapper vacancyReadMapper;

    @Autowired
    public void setUserReadMapper(UserReadMapper userReadMapper) {
        this.userReadMapper = userReadMapper;
    }

    @Autowired
    public void setVacancyReadMapper(VacancyReadMapper vacancyReadMapper) {
        this.vacancyReadMapper = vacancyReadMapper;
    }


    @Override
    public CompanyReadDto map(Company object) {
        return new CompanyReadDto(
                object.getId(),
                object.getName(),
                object.getEmail(),
                object.getLocation(),
                object.getImage(),
                getUserDto(object.getOwner()),
                getVacanciesDto(object.getVacancies())
        );
    }

    private UserReadDto getUserDto(User user) {
        return userReadMapper.map(user);
    }

    private List<VacancyReadDto> getVacanciesDto(List<Vacancy> vacancies) {
        return vacancies.stream()
                .map(vacancyReadMapper::map)
                .toList();
    }
}
