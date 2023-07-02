package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.UserFilter;
import kz.shyngys.finalproject.dto.UserJobApplicationFilter;
import kz.shyngys.finalproject.dto.UserProfileFilter;
import kz.shyngys.finalproject.model.UserJobApplication;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class UserJobApplicationSpecification {

    public static Specification<UserJobApplication> withFilter(UserJobApplicationFilter userJobAppFilter,
                                                               UserFilter userFilter,
                                                               UserProfileFilter userProfileFilter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (userJobAppFilter.userProfileId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("userProfile").get("id"),
                        userJobAppFilter.userProfileId()));
            }
            if (userJobAppFilter.jobId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("job").get("id"),
                        userJobAppFilter.jobId()));
            }
            if (userJobAppFilter.status() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), userJobAppFilter.status()));
            }
            if (userFilter.firstName() != null) {
                predicates.add(criteriaBuilder.like(root.get("userProfile").get("user").get("firstName"),
                        "%" + userFilter.firstName() + "%"));
            }
            if (userFilter.lastName() != null) {
                predicates.add(criteriaBuilder.like(root.get("userProfile").get("user").get("lastName"),
                        "%" + userFilter.lastName() + "%"));
            }
            if (userProfileFilter.location() != null) {
                predicates.add(criteriaBuilder.equal(root.get("userProfile").get("location"),
                        userProfileFilter.location()));
            }
            if (userProfileFilter.degree() != null) {
                predicates.add(criteriaBuilder.equal(root.get("userProfile").get("degree"), userProfileFilter.degree()));
            }
            if (userProfileFilter.experience() != null) {
                switch (userProfileFilter.experience()) {
                    case "0":
                        predicates.add(criteriaBuilder.equal(root.get("userProfile").get("experienceYears"),
                                0));
                        break;
                    case "1-3":
                        predicates.add(criteriaBuilder.between(root.get("userProfile").get("experienceYears"),
                                1, 3));
                        break;
                    case "3-6":
                        predicates.add(criteriaBuilder.between(root.get("userProfile").get("experienceYears"),
                                3, 6));
                        break;
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
