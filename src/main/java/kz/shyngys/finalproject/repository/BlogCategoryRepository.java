package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.BlogCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
}
