package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.JobFilter;
import kz.shyngys.finalproject.dto.UserJobApplicationFilter;
import kz.shyngys.finalproject.model.Job;
import kz.shyngys.finalproject.model.UserJobApplication;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserJobApplicationSpecification {

    public static Specification<UserJobApplication> withFilter(UserJobApplicationFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.userId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), filter.userId()));
            }
            if (filter.jobId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("job").get("id"), filter.jobId()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
