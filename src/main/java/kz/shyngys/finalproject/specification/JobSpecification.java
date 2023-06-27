package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.model.Job;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class JobSpecification {

    public static Specification<Job> withFilter(JobFilter jobFilter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (jobFilter.companyId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("company").get("id"), jobFilter.companyId()));
            }
            if (jobFilter.sortOrder() != null && jobFilter.sortOrder().equals("ne")) {
                query.orderBy(criteriaBuilder.desc(root.get("createdAt")));
            }
            if (jobFilter.sortOrder() != null && jobFilter.sortOrder().equals("od")) {
                query.orderBy(criteriaBuilder.asc(root.get("createdAt")));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
