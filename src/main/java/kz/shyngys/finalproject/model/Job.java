package kz.shyngys.finalproject.model;

import jakarta.annotation.PostConstruct;
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
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "offered_salary")
    private Integer offeredSalary;

    @Column(columnDefinition = "text")
    private String description;

    private String city;

    @Column(columnDefinition = "text")
    private String responsibilities;

    @Column(columnDefinition = "text")
    private String requiredSkills;

    @Column(name = "work_schedule")
    @Enumerated(EnumType.STRING)
    private WorkSchedule workSchedule;

    @Column(name = "keySkills")
    private String keySkills;

    private String position;

    private String category;

    private String experience;

    private String qualification;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @ManyToOne
    private Company company;

    @PostConstruct
    public void init() {
        createdAt = LocalDate.now();
    }
}
