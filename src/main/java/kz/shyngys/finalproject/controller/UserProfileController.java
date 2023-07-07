package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.UserProfileCreateEditAvatarDto;
import kz.shyngys.finalproject.dto.UserProfileCreateEditDto;
import kz.shyngys.finalproject.dto.UserProfileReadDto;
import kz.shyngys.finalproject.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-profiles")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping
    public List<UserProfileReadDto> findAll() {
        return userProfileService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileReadDto> findById(@PathVariable("id") Long id) {
        UserProfileReadDto user = userProfileService.findById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserProfileReadDto> findByUserId(@PathVariable("id") Long userId) {
        UserProfileReadDto user = userProfileService.findByUserId(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}/avatar")
    public ResponseEntity<byte[]> findAvatar(@PathVariable Long id) {
        byte[] image = userProfileService.findAvatar(id);
        return ResponseEntity.ok(image);
    }

    @PostMapping
    public ResponseEntity<UserProfileReadDto> create(@RequestBody UserProfileCreateEditDto user) {
        UserProfileReadDto newUser = userProfileService.save(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileReadDto> update(@PathVariable("id") Long id,
                                                     @RequestBody UserProfileCreateEditDto user) {
        UserProfileReadDto newUser = userProfileService.update(id, user);
        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/{id}/avatar")
    public ResponseEntity<byte[]> updateAvatar(@PathVariable("id") Long id,
                               UserProfileCreateEditAvatarDto userProfileAvatar) {
        byte[] image = userProfileService.updateAvatar(id, userProfileAvatar);
        return ResponseEntity.ok(image);
    }
}
