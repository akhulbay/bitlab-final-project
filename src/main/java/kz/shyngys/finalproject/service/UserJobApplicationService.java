package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.model.UserJobApplication;

import java.util.List;

public interface UserJobApplicationService {

    List<UserJobApplicationReadDto> findAll(UserJobApplicationFilter userJobAppFilter,
                                            UserFilter userFilter,
                                            UserProfileFilter userProfileFilter);

    UserJobApplicationReadDto findById(Long id);

    UserJobApplicationReadDto create(UserJobApplicationCreateEditDto userJobApp);

    UserJobApplicationReadDto update(Long id, UserJobApplicationCreateEditDto userJobApp);

    void delete(Long id);

    Integer countByJobId(Long jobId);
}
