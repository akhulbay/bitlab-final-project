package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.dto.records.UserFilter;
import kz.shyngys.finalproject.dto.records.UserJobApplicationFilter;
import kz.shyngys.finalproject.dto.records.UserProfileFilter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserJobApplicationService {

    Page<UserJobApplicationReadDto> findAll(UserJobApplicationFilter userJobAppFilter,
                                            UserFilter userFilter,
                                            UserProfileFilter userProfileFilter,
                                            Pageable pageable);

    UserJobApplicationReadDto findById(Long id);

    Integer findStatus(Long id);

    UserJobApplicationReadDto create(UserJobApplicationCreateEditDto userJobApp);

    UserJobApplicationReadDto update(Long id, UserJobApplicationCreateEditDto userJobApp);

    UserJobApplicationReadDto updateStatus(Long id, UserJobApplicationEditStatusDto userJobAppStatus);



    void delete(Long id);

    Integer countByJobId(Long jobId);
}
