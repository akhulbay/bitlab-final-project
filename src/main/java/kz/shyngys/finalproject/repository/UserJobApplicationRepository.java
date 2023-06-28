package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.UserJobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJobApplicationRepository extends JpaRepository<UserJobApplication, Long>,
        JpaSpecificationExecutor<UserJobApplication> {

    Integer countAllByJobId(Long jobId);
}
