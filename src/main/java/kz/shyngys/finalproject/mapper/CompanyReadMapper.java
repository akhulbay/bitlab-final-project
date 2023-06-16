package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.model.Company;
import kz.shyngys.finalproject.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CompanyReadMapper implements Mapper<Company, CompanyReadDto> {

    private final UserReadMapper userReadMapper;

    @Override
    public CompanyReadDto map(Company object) {
        return new CompanyReadDto(
                object.getId(),
                object.getName(),
                object.getEmail(),
                object.getLocation(),
                object.getImage(),
                getUserDto(object.getOwner())
        );
    }

    private UserReadDto getUserDto(User user) {
        return userReadMapper.map(user);
    }
}
