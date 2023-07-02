package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.*;

import java.util.List;

public interface UserJobApplicationService {

    List<UserJobApplicationReadDto> findAll(UserJobApplicationFilter userJobAppFilter,
                                            UserFilter userFilter,
                                            UserProfileFilter userProfileFilter);

    UserJobApplicationReadDto findById(Long id);

    Integer findStatus(Long id);

    UserJobApplicationReadDto create(UserJobApplicationCreateEditDto userJobApp);

    UserJobApplicationReadDto update(Long id, UserJobApplicationCreateEditDto userJobApp);

    UserJobApplicationReadDto updateStatus(Long id, UserJobApplicationEditStatusDto userJobAppStatus);

    void delete(Long id);

    Integer countByJobId(Long jobId);
}
