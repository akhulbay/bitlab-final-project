package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.service.UserJobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-job-applications")
@RequiredArgsConstructor
public class UserJobApplicationController {

    private final UserJobApplicationService userJobAppService;

    @GetMapping
    public List<UserJobApplicationReadDto> findAll(UserJobApplicationFilter userJobAppFilter,
                                                   UserFilter userFilter,
                                                   UserProfileFilter userProfileFilter) {
        return userJobAppService.findAll(userJobAppFilter, userFilter, userProfileFilter);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserJobApplicationReadDto> findById(@PathVariable("id") Long id){
        UserJobApplicationReadDto userJobApp = userJobAppService.findById(id);
        if (userJobApp == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userJobApp);
    }

    @GetMapping("/count/{id}")
    public Integer countByJobId(@PathVariable("id") Long id) {
        return userJobAppService.countByJobId(id);
    }

    @PostMapping
    public ResponseEntity<UserJobApplicationReadDto> create(@RequestBody UserJobApplicationCreateEditDto userJobApp) {
        UserJobApplicationReadDto newUserJobApp = userJobAppService.create(userJobApp);
        if (newUserJobApp == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(newUserJobApp, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserJobApplicationReadDto> update(@PathVariable("id") Long id,
                                                            @RequestBody UserJobApplicationCreateEditDto userJobApp) {
        UserJobApplicationReadDto newUserJobApp = userJobAppService.update(id, userJobApp);
        if (newUserJobApp == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newUserJobApp);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        userJobAppService.delete(id);
    }
}
