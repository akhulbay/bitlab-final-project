package kz.shyngys.finalproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String homePage() {
        return "index";
    }

    @GetMapping("/profile")
    public String profilePage() {
        return "profile";
    }

    @GetMapping("/employerprofile")
    public String employerProfilePage() {
        return "employer-profile";
    }

    @GetMapping("/companyprofile")
    public String companyProfilePage() {
        return "company-profile";
    }

    @GetMapping("/postjob")
    public String postJobPage() {
        return "post-job";
    }
}
