package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long>,
        JpaSpecificationExecutor<Job> {

    List<Job> findAllByCompanyId(Long companyId);

    Integer countByCompanyId(Long companyId);
}
