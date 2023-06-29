package com.ansh.blog.blogappapis.services.impl;

import com.ansh.blog.blogappapis.services.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService{

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {

        //File name
        String name = file.getOriginalFilename();

        //random name generator
        String randomID=UUID.randomUUID().toString();
        String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));

        //Full path
        String filePath = path + File.separator + fileName1;

        //Create folder if not created
        File f = new File(path);
        if(!f.exists()) {
            f.mkdir();
        }

        //Upload the file (file copy)
        Files.copy(file.getInputStream(), Paths.get(filePath));
        
        return fileName1;
    }

    @Override
    public InputStream getResource(String path, String fileName) throws FileNotFoundException {
        String fullPath=path+File.separator+fileName;
        InputStream is = new FileInputStream(fullPath);
        //database logic to return inputstream
        return is;
    }
    
}
