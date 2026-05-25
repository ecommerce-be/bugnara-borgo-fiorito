package com.borghettofiorito.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Smoke test: verifies the Spring application context loads without errors.
 * If wiring is broken (missing bean, bad config, broken migration),
 * this test fails fast.
 */
@SpringBootTest
class BorghettoFioritoApplicationTests {

    @Test
    void contextLoads() {
        // Empty body is intentional: success = the context started.
    }
}
