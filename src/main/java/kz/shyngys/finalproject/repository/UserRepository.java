package kz.shyngys.finalproject.repository;

import kz.shyngys.finalproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
