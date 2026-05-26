package com.borghettofiorito.api.controller;

import com.borghettofiorito.api.dto.response.AdminContactMessageResponse;
import com.borghettofiorito.api.service.AdminContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/messages")
public class AdminContactController {

    private final AdminContactService service;

    public AdminContactController(AdminContactService service) {
        this.service = service;
    }

    @GetMapping
    public List<AdminContactMessageResponse> inbox() {
        return service.findInbox();
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount() {
        return Map.of("count", service.countUnread());
    }

    @PatchMapping("/{id}/read")
    public AdminContactMessageResponse markAsRead(@PathVariable Long id) {
        return service.markAsRead(id);
    }

    @PatchMapping("/{id}/archive")
    public AdminContactMessageResponse archive(@PathVariable Long id) {
        return service.archive(id);
    }
}
