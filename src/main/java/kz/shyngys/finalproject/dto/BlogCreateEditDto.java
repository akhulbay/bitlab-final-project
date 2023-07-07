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
public class BlogCreateEditDto {

    private String title;
    private String content;
    private MultipartFile image;
    private Long blogCategoryId;
    private Long userId;
}
