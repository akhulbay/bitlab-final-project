package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.dto.records.UserFilter;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public PageResponse<UserReadDto> findAll(UserFilter userFilter,
                                             Pageable pageable) {
        Page<UserReadDto> users = userService.findAll(userFilter, pageable);
        return PageResponse.of(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReadDto> findById(@PathVariable("id") Long id) {
        UserReadDto user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@RequestBody UserCreateDto user) {
        if (userService.isUsernameExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        UserReadDto createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/employer")
    public ResponseEntity<?> createEmployer(@RequestBody UserCreateDto user) {
        if (userService.isUsernameExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        UserReadDto createdUser = userService.createEmployer(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody UserCreateDto user) {
        if (userService.isUsernameExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        }
        UserReadDto newUser = userService.create(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/data/{id}")
    public ResponseEntity<UserReadDto> updateData(@PathVariable("id") Long id,
                              @RequestBody UserEditDto user) {
        UserReadDto newUser = userService.updateData(id, user);
        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<UserReadDto> updatePassword(@PathVariable("id") Long id,
                                  @RequestBody UserEditPasswordDto userPassword) {
        UserReadDto user = userService.updatePassword(id, userPassword);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/role/{id}")
    public ResponseEntity<String> updateRole(@PathVariable("id") Long id,
                                             String role) {
        String newRole = userService.updateRole(id, role);
        return ResponseEntity.ok(newRole);
    }

    @PutMapping("/block/{id}")
    public ResponseEntity<String> block(@PathVariable("id") Long id) {
        userService.block(id);
        return ResponseEntity.ok("User is blocked!");
    }
    @PutMapping("/unblock/{id}")
    public ResponseEntity<String> unblock(@PathVariable("id") Long id) {
        userService.unblock(id);
        return ResponseEntity.ok("User is unblocked!");
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        userService.delete(id);
    }
}
