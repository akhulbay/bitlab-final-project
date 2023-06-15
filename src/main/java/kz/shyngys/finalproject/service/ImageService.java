package kz.shyngys.finalproject.service;

import java.io.InputStream;

public interface ImageService {

    void upload(String imagePath, InputStream content);
}
