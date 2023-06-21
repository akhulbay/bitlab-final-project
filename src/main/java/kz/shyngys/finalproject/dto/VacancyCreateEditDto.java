package kz.shyngys.finalproject.dto;

import kz.shyngys.finalproject.model.WorkSchedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VacancyCreateEditDto {

    private String title;
    private Integer offeredSalary;
    private String description;
    private String city;
    private String responsibilities;
    private String requiredSkills;
    private String workSchedule;
    private String keySkills;
    private String position;
    private String category;
    private String experience;
    private String createdAt;
    private Long companyId;
}
