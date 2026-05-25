package com.borghettofiorito.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.admin-api-key=test-key-for-tests",
        "app.cloudinary.cloud-name=test-cloud",
        "app.cloudinary.api-key=test-key",
        "app.cloudinary.api-secret=test-secret",
        "app.cloudinary.upload-preset=test-preset"
})
class AdminPhotoControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void rejectsAdminEndpointWithoutApiKey() throws Exception {
        mockMvc.perform(get("/api/v1/admin/photos/upload-signature"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void rejectsAdminEndpointWithWrongApiKey() throws Exception {
        mockMvc.perform(get("/api/v1/admin/photos/upload-signature")
                        .header("X-Admin-Key", "wrong"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void acceptsAdminEndpointWithCorrectApiKey() throws Exception {
        mockMvc.perform(get("/api/v1/admin/photos/upload-signature")
                        .header("X-Admin-Key", "test-key-for-tests"))
                .andExpect(status().isOk());
    }

    @Test
    void publicEndpointStillWorksWithoutApiKey() throws Exception {
        mockMvc.perform(get("/api/v1/spots"))
                .andExpect(status().isOk());
    }
}
