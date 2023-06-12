package kz.shyngys.finalproject.service.impl;

import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<UserReadDto> findAll() {
        return null;
    }

    @Override
    public UserReadDto findById() {
        return null;
    }

    @Override
    public UserReadDto save() {
        return null;
    }

    @Override
    public UserReadDto update() {
        return null;
    }

    @Override
    public void delete() {

    }
}
