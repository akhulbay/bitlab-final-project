package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.UserReadDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<UserReadDto> findAll();

    UserReadDto findById();

    UserReadDto save();

    UserReadDto update();

    void delete();
}
