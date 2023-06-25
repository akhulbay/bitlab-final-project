package kz.shyngys.finalproject.dto;

import kz.shyngys.finalproject.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserEditDto {

    private String firstName;
    private String lastName;
    private Role role;
}
