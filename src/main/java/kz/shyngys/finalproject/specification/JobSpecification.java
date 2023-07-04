package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.model.Job;
import kz.shyngys.finalproject.model.WorkSchedule;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class JobSpecification {

    public static Specification<Job> withFilter(JobFilter jobFilter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (jobFilter.companyId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("company").get("id"), jobFilter.companyId()));
            }
            if (jobFilter.sortOrder() != null) {
                switch (jobFilter.sortOrder()) {
                    case "ne":
                        query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
                        break;
                    case "od":
                        query.orderBy(criteriaBuilder.asc(root.get("createdAt")));
                        break;
                }
            }
            if (jobFilter.title() != null) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + jobFilter.title() + "%"));
            }
            if (jobFilter.city() != null) {
                predicates.add(criteriaBuilder.equal(root.get("city"), jobFilter.city()));
            }
            if (jobFilter.experience() != null) {
                predicates.add(criteriaBuilder.equal(root.get("experience"), jobFilter.experience()));
            }
            if (jobFilter.workSchedule() != null) {
                predicates.add(criteriaBuilder.equal(root.get("workSchedule"),
                        Enum.valueOf(WorkSchedule.class, jobFilter.workSchedule())));
            }
            if (jobFilter.category() != null) {
                predicates.add(criteriaBuilder.equal(root.get("category"), jobFilter.category()));
            }
            if (jobFilter.postDate() != null) {
                switch (jobFilter.postDate()) {
                    case "week":
                        predicates.add(criteriaBuilder.between(root.get("createdAt"),
                                LocalDate.now().minusWeeks(1L), LocalDate.now()));
                        break;
                    case "month":
                        predicates.add(criteriaBuilder.between(root.get("createdAt"),
                                LocalDate.now().minusMonths(1L), LocalDate.now()));
                        break;
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
