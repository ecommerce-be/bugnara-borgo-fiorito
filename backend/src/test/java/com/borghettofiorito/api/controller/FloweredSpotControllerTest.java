package com.borghettofiorito.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FloweredSpotControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnAllPublishedMarkers() throws Exception {
        mockMvc.perform(get("/api/v1/spots"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].latitude").exists())
                .andExpect(jsonPath("$[0].longitude").exists());
    }

    @Test
    void shouldReturnDetailForPublishedSpot() throws Exception {
        mockMvc.perform(get("/api/v1/spots/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").exists())
                .andExpect(jsonPath("$.photos").isArray())
                .andExpect(jsonPath("$.participants").isArray());
    }

    @Test
    void shouldReturn404ForUnknownSpot() throws Exception {
        mockMvc.perform(get("/api/v1/spots/999999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404));
    }
}
