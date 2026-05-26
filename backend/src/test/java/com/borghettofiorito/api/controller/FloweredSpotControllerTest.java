package com.borghettofiorito.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.jwt.secret=test-secret-that-is-long-enough-for-hs256-test-secret-that-is-long",
        "app.cloudinary.cloud-name=test",
        "app.cloudinary.api-key=test",
        "app.cloudinary.api-secret=test",
        "app.cloudinary.upload-preset=test"
})
class FloweredSpotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnAllPublishedMarkers() throws Exception {
        mockMvc.perform(get("/api/v1/spots"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$.length()").value(2));
    }

    @Test
    void shouldReturnDetailForPublishedSpot() throws Exception {
        mockMvc.perform(get("/api/v1/spots/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").exists());
    }

    @Test
    void shouldReturn404ForUnknownSpot() throws Exception {
        mockMvc.perform(get("/api/v1/spots/99999"))
                .andExpect(status().isNotFound());
    }
}
