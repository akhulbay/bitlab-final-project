package kz.shyngys.finalproject.dto.records;

public record UserJobApplicationFilter(Long userProfileId,
                                       Long jobId,
                                       Integer status) {
}
