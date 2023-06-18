package kz.shyngys.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
