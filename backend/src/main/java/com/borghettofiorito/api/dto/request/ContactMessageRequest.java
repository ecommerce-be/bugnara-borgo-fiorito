package com.borghettofiorito.api.dto.request;

import com.borghettofiorito.api.domain.enums.ContactSubject;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Payload sent by the public contact form.
 *
 * Bean Validation annotations cause Spring to reject malformed
 * payloads with a 400 Bad Request before our controller code runs.
 */
public record ContactMessageRequest(

        @NotBlank @Size(max = 150)
        String name,

        @NotBlank @Email @Size(max = 200)
        String email,

        @Size(max = 30)
        String phone,

        @NotNull
        ContactSubject subject,

        @NotBlank @Size(min = 10, max = 5000)
        String message
) {
}
