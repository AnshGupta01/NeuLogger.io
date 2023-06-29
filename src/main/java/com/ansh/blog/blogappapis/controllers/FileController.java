package com.ansh.blog.blogappapis.controllers;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ansh.blog.blogappapis.payloads.FileResponse;
import com.ansh.blog.blogappapis.services.FileService;

@RestController
@RequestMapping("/file")
public class FileController {
    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    //method to upload files
    @PostMapping("/upload")
    public ResponseEntity<FileResponse> fileUpload(@RequestParam("image") MultipartFile image){
        String fileName = null;
        try {
            fileName = this.fileService.uploadImage(path, image);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new FileResponse(null, "Cannot upload due to error"), HttpStatus.INTERNAL_SERVER_ERROR); 
        }
        return new ResponseEntity<>(new FileResponse(fileName, "Successfully uploaded!"),HttpStatus.OK);
    }  

    //method to serve files
    @GetMapping("/images/{imageName}")
    public void downloadImage(@PathVariable("imageName") String imageName
                            ,HttpServletResponse respone) throws FileNotFoundException {

        InputStream resource = this.fileService.getResource(path,imageName);

    }
}
