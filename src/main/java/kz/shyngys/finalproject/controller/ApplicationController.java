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

    @GetMapping("/job-details/{id}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER', 'ROLE_USER', 'ROLE_ADMIN')")
    public String jobDetailsPage(@PathVariable("id") Long id,
                                 Model model) {
        model.addAttribute("id", id);
        return "job-details";
    }

    @GetMapping("/company-details/{id}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER', 'ROLE_USER', 'ROLE_ADMIN')")
    public String companyDetailsPage(@PathVariable("id") Long id,
                                     Model model) {
        model.addAttribute("id", id);
        return "company-details";
    }

    @GetMapping("/candidates/{id}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER')")
    public String candidatesPage(@PathVariable("id") Long id,
                                 Model model) {
        model.addAttribute("id", id);
        return "candidates";
    }

    @GetMapping("/candidate-details/{id}")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER', 'ROLE_ADMIN')")
    public String candidateDetailsPage(@PathVariable("id") Long id,
                                       Model model) {
        model.addAttribute("id", id);
        return "user-details";
    }

    @GetMapping("/job-list")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER', 'ROLE_USER', 'ROLE_ADMIN')")
    public String jobListPage() {
        return "job-list";
    }

    @GetMapping("/company-list")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER', 'ROLE_USER', 'ROLE_ADMIN')")
    public String companyListPage() {
        return "company-list";
    }

    @GetMapping("/user-applications")
    @PreAuthorize("hasAnyRole('ROLE_USER')")
    public String userApplicationsPage() {
        return "user-applications";
    }

    @GetMapping("/favorites")
    @PreAuthorize("hasAnyRole('ROLE_EMPLOYER', 'ROLE_USER', 'ROLE_ADMIN')")
    public String favoritesPage() {
        return "favorites";
    }

    @GetMapping("/admin-panel")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public String adminPanelPage() {
        return "admin-panel";
    }

    @GetMapping("/add-user")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public String addUserPage() {
        return "add-user";
    }

}
