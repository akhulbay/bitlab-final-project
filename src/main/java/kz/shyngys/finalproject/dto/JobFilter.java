package kz.shyngys.finalproject.dto;

public record JobFilter(String sortOrder,
                        Long companyId,
                        String title,
                        String city,
                        String experience,
                        String workSchedule,
                        Integer category,
                        String postDate) {
}
