package kz.shyngys.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CompanyReadDto {

    private Long id;
    private String name;
    private String aboutCompany;
    private String location;
    private String website;
    private String establishDate;
    private Integer employeesNumber;
    private String image;
    private String whatsappLink;
    private String linkedinLink;
    private UserReadDto owner;
}
