package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.UserReadDto;

import java.util.List;

public interface UserService {

    List<UserReadDto> findAll();

    UserReadDto findById();

    UserReadDto save();

    UserReadDto update();

    void delete();
}
