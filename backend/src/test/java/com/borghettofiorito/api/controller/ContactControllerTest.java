package com.borghettofiorito.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldAcceptValidContactSubmission() throws Exception {
        String body = """
                {
                  "name": "Mario Rossi",
                  "email": "mario@example.com",
                  "subject": "JOIN_INITIATIVE",
                  "message": "Vorrei partecipare anche io all'iniziativa, come posso fare?"
                }
                """;

        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.status").value("received"))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    void shouldReject400WithInvalidEmail() throws Exception {
        String body = """
                {
                  "name": "Mario",
                  "email": "not-an-email",
                  "subject": "GENERIC_INFO",
                  "message": "Messaggio sufficientemente lungo"
                }
                """;

        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.email").exists());
    }
}
