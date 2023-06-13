package kz.shyngys.finalproject.dto;

import kz.shyngys.finalproject.model.Role;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReadDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private Role role;
}