package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserCreateEditMapper implements Mapper<UserCreateEditDto, User> {

    @Override
    public User map(UserCreateEditDto object) {
        return User.builder()
                .firstName(object.getFirstName())
                .lastName(object.getLastName())
                .username(object.getUsername())
                .password(object.getPassword())
                .role(object.getRole())
                .build();
    }
}
