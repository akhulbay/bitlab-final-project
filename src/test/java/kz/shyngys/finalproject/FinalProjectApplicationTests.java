package kz.shyngys.finalproject;

import kz.shyngys.finalproject.dto.UserCreateDto;
import kz.shyngys.finalproject.dto.UserReadDto;
import kz.shyngys.finalproject.mapper.UserCreateMapper;
import kz.shyngys.finalproject.mapper.UserReadMapper;
import kz.shyngys.finalproject.model.Role;
import kz.shyngys.finalproject.model.User;
import kz.shyngys.finalproject.repository.UserRepository;
import kz.shyngys.finalproject.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FinalProjectApplicationTests {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserReadMapper userReadMapper;

    @Autowired
    private UserCreateMapper userCreateMapper;

    @Test
    void checkCreateUser() {
        UserCreateDto userCreateDto = new UserCreateDto();
        userCreateDto.setUsername("test1@gmail.com");
        userCreateDto.setFirstName("Chingiz");
        userCreateDto.setLastName("Akhulbay");
        userCreateDto.setPassword("123");

        UserReadDto newUser = userService.createUser(userCreateDto);

        Assertions.assertNotNull(newUser);
        Assertions.assertEquals(userCreateDto.getUsername(), newUser.getUsername());
        Assertions.assertEquals(userCreateDto.getFirstName(), newUser.getFirstName());
        Assertions.assertEquals(userCreateDto.getLastName(), newUser.getLastName());
        Assertions.assertNotNull(newUser.getId());
        Assertions.assertNotNull(newUser.getBlocked());
        Assertions.assertNotNull(newUser.getRole());

        userRepository.deleteById(newUser.getId());
    }

    @Test
    void checkBlockUser() {
        UserCreateDto userCreateDto = new UserCreateDto();
        userCreateDto.setUsername("test2@gmail.com");
        userCreateDto.setFirstName("Chingiz");
        userCreateDto.setLastName("Akhulbay");
        userCreateDto.setPassword("123");

        UserReadDto newUser = userService.createUser(userCreateDto);

        userService.block(newUser.getId());

        UserReadDto blockedUser = userService.findById(newUser.getId());
        Assertions.assertEquals(true, blockedUser.getBlocked());

        userRepository.deleteById(blockedUser.getId());
    }

    @Test
    void checkUnblockUser() {
        UserCreateDto userCreateDto = new UserCreateDto();
        userCreateDto.setUsername("test3@gmail.com");
        userCreateDto.setFirstName("Chingiz");
        userCreateDto.setLastName("Akhulbay");
        userCreateDto.setPassword("123");

        UserReadDto newUser = userService.createUser(userCreateDto);

        userService.block(newUser.getId());
        userService.unblock(newUser.getId());

        UserReadDto blockedUser = userService.findById(newUser.getId());
        Assertions.assertEquals(false, blockedUser.getBlocked());

        userRepository.deleteById(blockedUser.getId());
    }

    @Test
    void checkUsernameExists() {
        userRepository.deleteAll();

        UserCreateDto userCreateDto = new UserCreateDto();
        userCreateDto.setUsername("test4@gmail.com");
        userCreateDto.setFirstName("Chingiz");
        userCreateDto.setLastName("Akhulbay");
        userCreateDto.setPassword("123");

        UserReadDto newUser = userService.createUser(userCreateDto);

        boolean usernameExists = userService.isUsernameExists(newUser.getUsername());

        Assertions.assertTrue(usernameExists);

        userRepository.deleteAll();
    }

    @Test
    void checkUserReadMapper() {
        User user = User.builder()
                .id(1L)
                .username("test5@gmail.com")
                .firstName("Chingiz")
                .lastName("Akhulbay")
                .password("123")
                .role(Role.ROLE_USER)
                .blocked(false)
                .build();

        UserReadDto dto = userReadMapper.toDto(user);

        Assertions.assertNotNull(dto);
        Assertions.assertEquals(user.getUsername(), dto.getUsername());
        Assertions.assertEquals(user.getFirstName(), dto.getFirstName());
        Assertions.assertEquals(user.getLastName(), dto.getLastName());
        Assertions.assertEquals(user.getRole(), dto.getRole());
        Assertions.assertEquals(false, dto.getBlocked());
    }

    @Test
    void checkUserCreateMapper() {
        UserCreateDto userCreateDto = new UserCreateDto();
        userCreateDto.setUsername("test6@gmail.com");
        userCreateDto.setFirstName("Chingiz");
        userCreateDto.setLastName("Akhulbay");
        userCreateDto.setPassword("123");


        User entity = userCreateMapper.toEntity(userCreateDto);

        Assertions.assertNotNull(entity);
        Assertions.assertEquals(userCreateDto.getUsername(), entity.getUsername());
        Assertions.assertEquals(userCreateDto.getLastName(), entity.getLastName());
        Assertions.assertEquals(userCreateDto.getFirstName(), entity.getFirstName());
        Assertions.assertEquals(userCreateDto.getPassword(), entity.getPassword());
    }

}
