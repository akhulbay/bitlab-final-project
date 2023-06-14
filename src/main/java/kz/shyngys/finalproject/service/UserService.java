package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<UserReadDto> findAll();

    UserReadDto findById();

    UserReadDto findByUsername(String username);

    UserReadDto saveUser(UserCreateEditDto user);

    UserReadDto saveEmployer(UserCreateEditDto user);

    UserReadDto update();

    void delete();

    boolean isUsernameExists(String username);
}
