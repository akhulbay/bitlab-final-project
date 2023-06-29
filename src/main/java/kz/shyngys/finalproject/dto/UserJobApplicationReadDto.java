package kz.shyngys.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserJobApplicationReadDto {

    private Long id;
    private String coverLetter;
    private LocalDate createdAt;
    private UserProfileReadDto userProfile;
    private JobReadDto job;
}
