package kz.shyngys.finalproject.dto;

import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import kz.shyngys.finalproject.model.Vacancy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyReadDto {

    private Long id;
    private String name;
    private String email;
    private String location;
    private String image;
    private UserReadDto owner;
}
