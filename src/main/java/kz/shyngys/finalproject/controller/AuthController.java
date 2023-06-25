package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.UserCreateDto;
import kz.shyngys.finalproject.service.CompanyService;
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
public class AuthController {

    private final UserService userService;
    private final CompanyService companyService;

    @GetMapping("/signin/user")
    public String userLoginPage() {
        return "user-sign-in";
    }

    @GetMapping("/signup/user")
    public String userRegistrationPage() {
        return "user-sign-up";
    }

    @PostMapping("/signup/user")
    public String userRegistration(UserCreateDto user,
                                   @RequestParam("repeatPassword") String repeatPassword) {

        if (userService.isUsernameExists(user.getUsername())) {
            return "redirect:/auth/signup/user?emailerror";
        }

        if (!user.getPassword().equals(repeatPassword)) {
            return "redirect:/auth/signup/user?passworderror";
        }

        userService.createUser(user);
        return "redirect:/auth/signin/user";
    }

    @GetMapping("/signin/employer")
    public String employerLoginPage() {
        return "employer-sign-in";
    }

    @GetMapping("/signup/employer")
    public String employerRegistrationPage() {
        return "employer-sign-up";
    }

    @PostMapping("/signup/employer")
    public String employerRegistration(UserCreateDto user,
                                       @RequestParam("repeatPassword") String repeatPassword) {

        if (userService.isUsernameExists(user.getUsername())) {
            return "redirect:/auth/signup/user?emailerror";
        }

        if (!user.getPassword().equals(repeatPassword)) {
            return "redirect:/auth/signup/user?passworderror";
        }

        userService.createEmployer(user);
        return "redirect:/auth/signin/employer";
    }

    @GetMapping("/signout")
    public String userLogoutPage() {
        return "sign-out";
    }

    @GetMapping("/403-error")
    public String page403() {
        return "403-error";
    }

}
