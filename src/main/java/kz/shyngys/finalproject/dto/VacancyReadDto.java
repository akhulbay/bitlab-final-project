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
public class VacancyReadDto {

    private Long id;
    private String name;
    private Integer startingSalary;
    private String city;
    private String responsibilities;
    private String requirements;
    private String conditions;
    private WorkSchedule workSchedule;
    private String keySkills;
    private LocalDate createdAt;
    private CompanyReadDto company;
}
