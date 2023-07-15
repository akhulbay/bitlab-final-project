package kz.shyngys.finalproject.dto.records;

public record JobFilter(String sortOrder,
                        Long companyId,
                        String title,
                        String city,
                        String experience,
                        String workSchedule,
                        Long categoryId,
                        String postDate) {
}
