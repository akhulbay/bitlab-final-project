package kz.shyngys.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileCreateEditDto {

    private String aboutUser;
    private String phoneNumber;
    private Integer accountType;
    private String languages;
    private String location;
    private String facebookLink;
    private String telegramLink;
    private String linkedinLink;
    private String githubLink;
    private String skills;
    private String degree;
    private String university;
    private String faculty;
    private String major;
    private Integer yearOfAdmission;
    private Integer yearOfGraduation;
    private Double experienceYears;
    private String aboutExperience;
    private MultipartFile image;
    private String userId;
}
