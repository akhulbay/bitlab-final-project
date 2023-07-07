package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.GeneralCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralCategoryRepository extends JpaRepository<GeneralCategory, Long> {
}
