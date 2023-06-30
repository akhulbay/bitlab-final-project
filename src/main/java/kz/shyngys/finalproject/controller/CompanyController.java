package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.CompanyCreateEditDto;
import kz.shyngys.finalproject.dto.CompanyFilter;
import kz.shyngys.finalproject.dto.CompanyReadDto;
import kz.shyngys.finalproject.dto.PageResponse;
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

        if (company == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(company);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<CompanyReadDto> findByUserId(@PathVariable("id") Long id) {
        CompanyReadDto company = companyService.findByUserId(id);

        if (company == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(company);
    }

    @GetMapping("/{id}/avatar")
    public ResponseEntity<byte[]> findAvatar(@PathVariable Long id) {
        byte[] image = companyService.findAvatar(id);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(image);
    }

    @PostMapping
    public ResponseEntity<CompanyReadDto> create(CompanyCreateEditDto company) {
        CompanyReadDto newCompany = companyService.create(company);

        if (newCompany == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CompanyReadDto> update(@PathVariable("id") Long id,
                                                 CompanyCreateEditDto company) {
        CompanyReadDto newCompany = companyService.update(id, company);

        if (newCompany == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newCompany);
    }
}
