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
@Table(name = "t_company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "about_company", columnDefinition = "text")
    private String aboutCompany;

    private String location;

    private String website;

    @Column(name = "establish_date")
    private LocalDate establishDate;

    @Column(name = "employees_number")
    private Integer employeesNumber;

    private String image;

    @Column(name = "whatsapp_link")
    private String whatsappLink;

    @Column(name = "linkedin_link")
    private String linkedinLink;

    @OneToOne(fetch = FetchType.EAGER)
    private User owner;
}
