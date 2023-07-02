package kz.shyngys.finalproject.dto;

public record UserJobApplicationFilter(Long userProfileId,
                                       Long jobId,
                                       Integer status) {
}
