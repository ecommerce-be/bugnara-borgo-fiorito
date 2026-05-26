package com.borghettofiorito.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "app.jwt.secret=test-secret-that-is-long-enough-for-hs256-test-secret-that-is-long",
        "app.cloudinary.cloud-name=test",
        "app.cloudinary.api-key=test",
        "app.cloudinary.api-secret=test",
        "app.cloudinary.upload-preset=test"
})
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldAcceptValidContactSubmission() throws Exception {
        String body = """
                {
                  "name": "Mario Rossi",
                  "email": "mario.rossi@example.it",
                  "phone": "3331234567",
                  "subject": "GENERIC_INFO",
                  "message": "Salve, vorrei avere informazioni sull'iniziativa Bugnara Borgo Fiorito."
                }
                """;

        // 202 Accepted: the message is queued and the admin email is sent async.
        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    void shouldReject400WithInvalidEmail() throws Exception {
        String body = """
                {
                  "name": "Mario",
                  "email": "not-an-email",
                  "subject": "GENERIC_INFO",
                  "message": "Test message"
                }
                """;

        mockMvc.perform(post("/api/v1/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isBadRequest());
    }
}