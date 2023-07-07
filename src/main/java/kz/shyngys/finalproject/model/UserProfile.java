package kz.shyngys.finalproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "t_user_profile")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "about_user", columnDefinition = "text")
    private String aboutUser;

    @Column(name = "phoneNumber")
    private String phoneNumber;

    private String languages;

    private String location;

    @Column(name = "facebook_link")
    private String facebookLink;

    @Column(name = "telegram_link")
    private String telegramLink;

    @Column(name = "linkedin_link")
    private String linkedinLink;

    @Column(name = "github_link")
    private String githubLink;

    private String skills;

    private String degree;

    private String university;

    private String faculty;

    private String major;

    @Column(name = "year_of_admission")
    private Integer yearOfAdmission;

    @Column(name = "year_of_graduation")
    private Integer yearOfGraduation;

    @Column(name = "experience_years")
    private Double experienceYears;

    @Column(name = "about_experience", columnDefinition = "text")
    private String aboutExperience;

    private String image;

    @ManyToOne
    @JoinColumn(name = "account_type")
    private GeneralCategory accountType;

    @OneToOne
    private User user;
}
