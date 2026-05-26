package com.borghettofiorito.api.dto.request;

import com.borghettofiorito.api.domain.enums.PublicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record StoryUpsertRequest(

        @NotBlank @Size(max = 200)
        String title,

        @NotBlank @Size(max = 220)
        @Pattern(regexp = "^[a-z0-9-]+$",
                 message = "slug must contain only lowercase letters, digits and dashes")
        String slug,

        @Size(max = 500)
        String excerpt,

        String contentMarkdown,

        @Size(max = 500)
        String coverImageUrl,

        @Size(max = 150)
        String authorName,

        LocalDate publishedAt,

        @NotNull
        PublicationStatus status
) {
}
