package kz.shyngys.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobCreateEditDto {

    private String title;
    private Integer offeredSalary;
    private String description;
    private String city;
    private String responsibilities;
    private String requiredSkills;
    private String workSchedule;
    private String keySkills;
    private String position;
    private Integer category;
    private String experience;
    private String qualification;
    private Long companyId;
}
