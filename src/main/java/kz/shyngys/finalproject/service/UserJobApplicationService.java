package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.UserJobApplicationCreateEditDto;
import kz.shyngys.finalproject.dto.UserJobApplicationFilter;
import kz.shyngys.finalproject.dto.UserJobApplicationReadDto;
import kz.shyngys.finalproject.model.UserJobApplication;

import java.util.List;

public interface UserJobApplicationService {

    List<UserJobApplicationReadDto> findAll(UserJobApplicationFilter filter);

    UserJobApplicationReadDto findById(Long id);

    UserJobApplicationReadDto create(UserJobApplicationCreateEditDto userJobApp);

    UserJobApplicationReadDto update(Long id, UserJobApplicationCreateEditDto userJobApp);

    void delete(Long id);

    Integer countByJobId(Long jobId);
}
