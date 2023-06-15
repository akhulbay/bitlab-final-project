package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.UserCreateEditDto;
import kz.shyngys.finalproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {

    private final UserService userService;

    @GetMapping("/signin/user")
    public String userLoginPage() {
        return "user_login";
    }

    @GetMapping("/signup/user")
    public String userRegistrationPage() {
        return "user_registration";
    }

    @PostMapping("signup/user")
    public String userRegistration(UserCreateEditDto user,
                                   @RequestParam("repeatPassword") String repeatPassword) {

        if (userService.isUsernameExists(user.getUsername())) {
            return "redirect:/auth/signup/user?emailerror";
        }

        if (!user.getPassword().equals(repeatPassword)) {
            return "redirect:/auth/signup/user?passworderror";
        }

        userService.saveUser(user);
        return "redirect:/profile";
    }

    @GetMapping("/signin/employer")
    public String employerLoginPage() {
        return "employer_login";
    }

    @GetMapping("/signup/employer")
    public String employerRegistrationPage() {
        return "employer_registration";
    }

    @PostMapping("signup/employer")
    public String employerRegistration(UserCreateEditDto user,
                                   @RequestParam("repeatPassword") String repeatPassword) {

        if (userService.isUsernameExists(user.getUsername())) {
            return "redirect:/auth/signup/user?emailerror";
        }

        if (!user.getPassword().equals(repeatPassword)) {
            return "redirect:/auth/signup/user?passworderror";
        }

        userService.saveEmployer(user);
        return "redirect:/profile";
    }
}
