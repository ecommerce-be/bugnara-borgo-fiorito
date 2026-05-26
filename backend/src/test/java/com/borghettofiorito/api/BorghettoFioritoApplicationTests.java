package com.borghettofiorito.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

/**
 * Sanity test: the Spring application context starts up correctly.
 *
 * Provides the env vars needed by JwtService and the Cloudinary signature
 * service so that test runs don't require a real .env file.
 */
@SpringBootTest
@TestPropertySource(properties = {
        "app.jwt.secret=test-secret-that-is-long-enough-for-hs256-test-secret-that-is-long",
        "app.cloudinary.cloud-name=test",
        "app.cloudinary.api-key=test",
        "app.cloudinary.api-secret=test",
        "app.cloudinary.upload-preset=test"
})
class BorghettoFioritoApplicationTests {

    @Test
    void contextLoads() {
        // If the Spring context boots, we're good.
    }
}
