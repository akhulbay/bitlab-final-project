package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
