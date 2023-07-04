package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    Page<UserReadDto> findAll(UserFilter userFilter, Pageable pageable);

    UserReadDto findById(Long id);

    UserReadDto findByUsername(String username);

    UserReadDto createUser(UserCreateDto user);

    UserReadDto createEmployer(UserCreateDto user);

    UserReadDto updateData(Long id, UserEditDto user);

    UserReadDto updatePassword(Long id, UserEditPasswordDto user);

    String updateRole(Long id, String role);

    void block(Long id);

    void unblock(Long id);

    void delete(Long id);

    boolean isUsernameExists(String username);
}
