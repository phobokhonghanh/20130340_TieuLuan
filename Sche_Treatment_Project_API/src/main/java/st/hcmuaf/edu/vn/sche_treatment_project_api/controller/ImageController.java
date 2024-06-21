package st.hcmuaf.edu.vn.sche_treatment_project_api.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import st.hcmuaf.edu.vn.sche_treatment_project_api.service.impl.ImageImpl;

import java.io.File;
import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("${api}/images")
@AllArgsConstructor
public class ImageController {
    private ImageImpl imageImpl;

    @PostMapping("/upload-single")
    public ResponseEntity<String> uploadSingleImage(@RequestParam("image") MultipartFile image) throws IOException, GeneralSecurityException {
        if (image.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        File tempFile = File.createTempFile("temp", null);
        image.transferTo(tempFile);
        return ResponseEntity.status(HttpStatus.OK).body(imageImpl.uploadImageToDrive(tempFile));
    }
}
