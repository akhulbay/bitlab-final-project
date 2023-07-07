package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.*;
import kz.shyngys.finalproject.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping
    public PageResponse<CompanyReadDto> findAll(CompanyFilter companyFilter, Pageable pageable) {
        Page<CompanyReadDto> companies = companyService.findAll(companyFilter, pageable);
        return PageResponse.of(companies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyReadDto> findById(@PathVariable("id") Long id) {
        CompanyReadDto company = companyService.findById(id);
        return ResponseEntity.ok(company);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<CompanyReadDto> findByUserId(@PathVariable("id") Long id) {
        CompanyReadDto company = companyService.findByUserId(id);
        return ResponseEntity.ok(company);
    }

    @GetMapping("/{id}/avatar")
    public ResponseEntity<byte[]> findAvatar(@PathVariable Long id) {
        byte[] image = companyService.findAvatar(id);
        return ResponseEntity.ok(image);
    }

    @PostMapping
    public ResponseEntity<CompanyReadDto> create(@RequestBody CompanyCreateEditDto company) {
        CompanyReadDto newCompany = companyService.create(company);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyReadDto> update(@PathVariable("id") Long id,
                                                 @RequestBody CompanyCreateEditDto company) {
        CompanyReadDto newCompany = companyService.update(id, company);
        return ResponseEntity.ok(newCompany);
    }

    @PutMapping("/{id}/avatar")
    public ResponseEntity<byte[]> updateAvatar(@PathVariable("id") Long id,
                                               CompanyCreateEditAvatarDto companyAvatar) {
        byte[] image = companyService.updateAvatar(id, companyAvatar);
        return ResponseEntity.ok(image);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        companyService.delete(id);
    }
}
