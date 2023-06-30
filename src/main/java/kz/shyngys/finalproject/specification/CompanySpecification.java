package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.CompanyFilter;
import kz.shyngys.finalproject.model.Company;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class CompanySpecification {

    public static Specification<Company> withFilter(CompanyFilter companyFilter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (companyFilter.name() != null) {
                predicates.add(criteriaBuilder.like(root.get("name"), "%" + companyFilter.name() + "%"));
            }
            if (companyFilter.location() != null) {
                predicates.add(criteriaBuilder.equal(root.get("location"), companyFilter.location()));
            }
            if (companyFilter.sortOrder() != null) {
                switch (companyFilter.sortOrder()) {
                    case "ne":
                        query.orderBy(criteriaBuilder.desc(root.get("establishDate")));
                        break;
                    case "od":
                        query.orderBy(criteriaBuilder.asc(root.get("establishDate")));
                        break;
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
