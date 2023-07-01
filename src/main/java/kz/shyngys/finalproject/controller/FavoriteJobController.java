package kz.shyngys.finalproject.controller;

import kz.shyngys.finalproject.dto.FavoriteJobCreateEditDto;
import kz.shyngys.finalproject.dto.FavoriteJobFilter;
import kz.shyngys.finalproject.dto.FavoriteJobReadDto;
import kz.shyngys.finalproject.service.FavoriteJobService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorite-jobs")
@RequiredArgsConstructor
public class FavoriteJobController {

    private final FavoriteJobService favoriteJobService;

    @GetMapping
    public List<FavoriteJobReadDto> findAll(FavoriteJobFilter filter) {
        return favoriteJobService.findAll(filter);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FavoriteJobReadDto> findById(@PathVariable("id") Long id) {
        FavoriteJobReadDto favoriteJob = favoriteJobService.findById(id);

        if (favoriteJob == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(favoriteJob);
    }

    @PostMapping
    public ResponseEntity<FavoriteJobReadDto> create(@RequestBody FavoriteJobCreateEditDto favoriteJob) {
        FavoriteJobReadDto newFavoriteJob = favoriteJobService.create(favoriteJob);

        if (newFavoriteJob == null) {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(newFavoriteJob, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FavoriteJobReadDto> update(@PathVariable("id") Long id,
                                                     @RequestBody FavoriteJobCreateEditDto favoriteJob) {
        FavoriteJobReadDto newFavoriteJob = favoriteJobService.update(id, favoriteJob);

        if (newFavoriteJob == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(newFavoriteJob);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Long id) {
        favoriteJobService.delete(id);
    }
}
