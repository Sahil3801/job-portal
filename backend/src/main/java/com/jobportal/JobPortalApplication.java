package com.jobportal;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JobPortalApplication {

	public static void main(String[] args) {
		// Store server-generated times (post time, timestamps) in UTC; the frontend
		// converts them to the viewer's local time.
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(JobPortalApplication.class, args);
	}

}
