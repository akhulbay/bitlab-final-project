package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.UserJobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserJobApplicationRepository extends JpaRepository<UserJobApplication, Long>,
        JpaSpecificationExecutor<UserJobApplication> {

    Integer countAllByJobId(Long jobId);

    @Query("select a.status from UserJobApplication a where a.id = :id")
    Optional<Integer> findStatusById(Long id);
}
