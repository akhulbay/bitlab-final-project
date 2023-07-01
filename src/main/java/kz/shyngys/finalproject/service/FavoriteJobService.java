package kz.shyngys.finalproject.service;

import kz.shyngys.finalproject.dto.FavoriteJobCreateEditDto;
import kz.shyngys.finalproject.dto.FavoriteJobFilter;
import kz.shyngys.finalproject.dto.FavoriteJobReadDto;

import java.util.List;

public interface FavoriteJobService {

    List<FavoriteJobReadDto> findAll(FavoriteJobFilter filter);

    FavoriteJobReadDto findById(Long id);

    FavoriteJobReadDto create(FavoriteJobCreateEditDto favoriteJob);

    FavoriteJobReadDto update(Long id, FavoriteJobCreateEditDto favoriteJob);

    void delete(Long id);
}
