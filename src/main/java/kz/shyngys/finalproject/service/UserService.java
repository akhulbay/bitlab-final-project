package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.UserCreateDto;
import kz.shyngys.finalproject.dto.UserEditDto;
import kz.shyngys.finalproject.dto.UserEditPasswordDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<UserReadDto> findAll();

    UserReadDto findById(Long id);

    UserReadDto findByUsername(String username);

    UserReadDto createUser(UserCreateDto user);

    UserReadDto createEmployer(UserCreateDto user);

    UserReadDto updateData(Long id, UserEditDto user);

    UserReadDto updatePassword(Long id, UserEditPasswordDto user);

    void delete(Long id);

    boolean isUsernameExists(String username);
}
