package kz.shyngys.finalproject.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "t_vacancy")
public class Vacancy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "starting_salary")
    private Integer startingSalary;

    private String city;

    private String responsibilities;

    private String requirements;

    private String conditions;

    @Column(name = "work_schedule")
    @Enumerated(EnumType.STRING)
    private WorkSchedule workSchedule;

    @Column(name = "keySkills")
    private String keySkills;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @ManyToOne
    private Company company;
}
