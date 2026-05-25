package com.borghettofiorito.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Entry point of the Borghetto Fiorito backend.
 *
 * Equivalent to a "public static void main" in a normal Java app,
 * but @SpringBootApplication wires up auto-configuration, component
 * scanning, and configuration properties for the whole context.
 */
@SpringBootApplication
public class BorghettoFioritoApplication {

    public static void main(String[] args) {
        SpringApplication.run(BorghettoFioritoApplication.class, args);
    }
}
