package com.jobportal.api;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// Lightweight public endpoint the frontend calls on page load to wake the
// server (Render's free plan sleeps after inactivity).
@RestController
@CrossOrigin
public class HealthAPI {

	@GetMapping("/health")
	public ResponseEntity<Map<String, String>> health() {
		return ResponseEntity.ok(Map.of("status", "ok"));
	}
}
