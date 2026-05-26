package com.borghettofiorito.api.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * Serves the React SPA from classpath:/static/.
 *
 * Why this exists:
 * React Router handles routes client-side. If a user lands directly on
 * /mappa (or refreshes), the browser asks the server for /mappa, which
 * doesn't exist as a real endpoint. Without this config Spring returns 404.
 *
 * Our resolver:
 *   - first looks for a real file (e.g. /assets/index-abc123.js → serves it)
 *   - if not found, returns index.html so React Router can take over
 *
 * API routes (under /api/**) are NOT touched — they keep returning JSON
 * normally because they match @RestController methods before this resolver
 * is consulted.
 *
 * Active only when Spring's static folder contains a built React app
 * (placed there by the Dockerfile multi-stage build). In local dev the
 * folder is empty, this code is a no-op.
 */
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new SpaPathResourceResolver());
    }

    /**
     * Custom resolver: real files first, index.html as SPA fallback.
     */
    static class SpaPathResourceResolver extends PathResourceResolver {
        @Override
        protected Resource getResource(String resourcePath, Resource location)
                throws IOException {
            Resource requested = super.getResource(resourcePath, location);
            if (requested != null && requested.exists() && requested.isReadable()) {
                return requested;
            }
            // SPA fallback: serve index.html for any unknown path
            Resource index = new ClassPathResource("/static/index.html");
            return index.exists() ? index : null;
        }
    }
}
