package com.jobportal.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// One pending password-reset code per email. Only a hash of the code is stored.
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "otp")
public class OTP {
	@Id
	private String email;
	private String otpHash;
	private LocalDateTime creationTime;
	private int attempts;
}
