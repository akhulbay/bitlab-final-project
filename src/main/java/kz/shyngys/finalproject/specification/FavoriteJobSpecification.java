package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.records.FavoriteJobFilter;
import kz.shyngys.finalproject.model.FavoriteJob;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class FavoriteJobSpecification {

    public static Specification<FavoriteJob> withFilter(FavoriteJobFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.jobId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("job").get("id"), filter.jobId()));
            }
            if (filter.userId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("user").get("id"), filter.userId()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
