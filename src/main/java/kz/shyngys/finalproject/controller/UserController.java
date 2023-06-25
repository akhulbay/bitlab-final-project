package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.UserCreateDto;
import kz.shyngys.finalproject.dto.UserEditDto;
import kz.shyngys.finalproject.dto.UserEditPasswordDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserReadDto> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserReadDto> findById(@PathVariable("id") Long id) {
        UserReadDto user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
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
        UserReadDto createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/data/{id}")
    public ResponseEntity<UserReadDto> updateData(@PathVariable("id") Long id,
                              @RequestBody UserEditDto user) {
        UserReadDto newUser = userService.updateData(id, user);
        if (newUser == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<UserReadDto> updatePassword(@PathVariable("id") Long id,
                                  @RequestBody UserEditPasswordDto userPassword) {
        UserReadDto user = userService.updatePassword(id, userPassword);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        userService.delete(id);
    }
}
