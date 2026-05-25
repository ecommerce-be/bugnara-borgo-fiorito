package com.borghettofiorito.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Enables Spring Data JPA auditing.
 * Required so that @CreatedDate and @LastModifiedDate on BaseEntity
 * are populated automatically when entities are saved.
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
}
