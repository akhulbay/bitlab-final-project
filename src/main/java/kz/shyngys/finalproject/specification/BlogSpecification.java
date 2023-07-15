package kz.shyngys.finalproject.specification;

import jakarta.persistence.criteria.Predicate;
import kz.shyngys.finalproject.dto.records.BlogFilter;
import kz.shyngys.finalproject.model.Blog;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class BlogSpecification {

    public static Specification<Blog> withFilter(BlogFilter blogFilter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (blogFilter.title() != null) {
                predicates.add(criteriaBuilder.like(root.get("title"), "%" + blogFilter.title() + "%"));
            }
            if (blogFilter.blogCategoryId() != null) {
                predicates.add(criteriaBuilder.equal(root.get("blogCategory").get("id"), blogFilter.blogCategoryId()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
