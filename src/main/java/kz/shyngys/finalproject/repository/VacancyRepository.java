package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.Vacancy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VacancyRepository extends JpaRepository<Vacancy, Long> {
}
