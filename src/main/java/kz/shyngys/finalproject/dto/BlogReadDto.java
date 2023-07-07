package kz.shyngys.finalproject.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BlogReadDto {

    private Long id;
    private String title;
    private String content;
    private String createdAt;
    private BlogCategoryReadDto blogCategory;
    private UserReadDto user;
}
