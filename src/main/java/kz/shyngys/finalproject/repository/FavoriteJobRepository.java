package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.FavoriteJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteJobRepository extends JpaRepository<FavoriteJob, Long>,
        JpaSpecificationExecutor<FavoriteJob> {
}
