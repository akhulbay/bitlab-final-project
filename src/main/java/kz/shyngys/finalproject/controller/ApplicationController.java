package kz.shyngys.finalproject.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ApplicationController {

    @GetMapping("/")
    public String homePage() {
        return "index";
    }

    @GetMapping("/profile")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public String profilePage() {
        return "profile";
    }

    @GetMapping("/employer-profile")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER')")
    public String employerProfilePage() {
        return "employer-profile";
    }

    @GetMapping("/company-profile")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER')")
    public String companyProfilePage() {
        return "company-profile";
    }

    @GetMapping("/post-job")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER')")
    public String postJobPage() {
        return "post-job";
    }

    @GetMapping("/manage-jobs")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER')")
    public String manageJobsPage() {
        return "manage-jobs";
    }

    @GetMapping("/edit-job/{id}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER')")
    public String editJobPage(@PathVariable("id") Long id,
                              Model model) {
        model.addAttribute("id", id);
        return "edit-job";
    }
}
