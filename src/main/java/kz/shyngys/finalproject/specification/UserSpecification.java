package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.UserFilter;
import kz.shyngys.finalproject.model.Role;
import kz.shyngys.finalproject.model.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserSpecification {

    public static Specification<User> withFilter(UserFilter userFilter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (userFilter.firstName() != null) {
                predicates.add(criteriaBuilder.like(root.get("firstName"), "%" + userFilter.firstName() + "%"));
            }
            if (userFilter.lastName() != null) {
                predicates.add(criteriaBuilder.like(root.get("lastName"), "%" + userFilter.lastName() + "%"));
            }
            if (userFilter.role() != null) {
                predicates.add(criteriaBuilder.equal(root.get("role"), Enum.valueOf(Role.class, userFilter.role())));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
