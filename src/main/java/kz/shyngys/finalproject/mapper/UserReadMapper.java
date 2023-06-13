package kz.shyngys.finalproject.mapper;

import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.model.User;

public class UserReadMapper implements Mapper<User, UserReadDto>{

    @Override
    public UserReadDto map(User object) {
        return new UserReadDto(
                object.getId(),
                object.getFirstName(),
                object.getLastName(),
                object.getUsername(),
                object.getPassword(),
                object.getRole()
        );
    }
}
