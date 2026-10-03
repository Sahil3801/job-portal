package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.LoginDTO;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.dto.ResetPasswordDTO;
import com.jobportal.dto.ResponseDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.OTP;
import com.jobportal.entity.User;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.OTPRepository;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.Utilities;

@Service("userService")
public class UserServiceImpl implements UserService {

	private static final int OTP_VALID_MINUTES = 10;
	private static final int OTP_MAX_ATTEMPTS = 5;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ProfileService profileService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private NotificationService notificationService;

	@Autowired
	private OTPRepository otpRepository;

	@Autowired
	private MailService mailService;

	@Override
	public UserDTO registerUser(UserDTO userDTO) throws JobPortalException {
		// Admin accounts cannot be created through public signup
		if (userDTO.getAccountType() != AccountType.APPLICANT && userDTO.getAccountType() != AccountType.EMPLOYER)
			throw new JobPortalException("INVALID_ACCOUNT_TYPE");
		Optional<User> optional = userRepository.findByEmail(userDTO.getEmail());
		if (optional.isPresent())
			throw new JobPortalException("USER_FOUND");
		userDTO.setId(Utilities.getNextSequenceId("users"));
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		userDTO.setProfileId(profileService.createProfile(userDTO));
		User user = userRepository.save(userDTO.toEntity());
		user.setPassword(null);
		return user.toDTO();
	}

	@Override
	public UserDTO loginUser(LoginDTO loginDTO) throws JobPortalException {
		User user = userRepository.findByEmail(loginDTO.getEmail())
				.orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
		if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword()))
			throw new JobPortalException("INVALID_CREDENTIALS");
		user.setPassword(null);
		return user.toDTO();
	}

	@Override
	public ResponseDTO sendOtp(String email) throws JobPortalException {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
		String otp = Utilities.generateOTP();
		otpRepository.save(new OTP(email, passwordEncoder.encode(otp), LocalDateTime.now(), 0));
		mailService.send(email, "Your HireHub password reset code",
				"<p>Hi " + user.getName() + ",</p>"
						+ "<p>Your password reset code is:</p>"
						+ "<p style=\"font-size:24px;font-weight:bold;letter-spacing:4px\">" + otp + "</p>"
						+ "<p>It expires in " + OTP_VALID_MINUTES + " minutes. If you did not ask for this, ignore this email.</p>");
		return new ResponseDTO("A reset code has been sent to your email.");
	}

	@Override
	public ResponseDTO verifyOtp(String email, String otp) throws JobPortalException {
		checkOtp(email, otp);
		return new ResponseDTO("Code verified.");
	}

	@Override
	public ResponseDTO changePassword(ResetPasswordDTO resetDTO) throws JobPortalException {
		// The code is checked again here, so the password can only change with a valid code
		checkOtp(resetDTO.getEmail(), resetDTO.getOtp());
		User user = userRepository.findByEmail(resetDTO.getEmail())
				.orElseThrow(() -> new JobPortalException("USER_NOT_FOUND"));
		user.setPassword(passwordEncoder.encode(resetDTO.getPassword()));
		userRepository.save(user);
		otpRepository.deleteById(resetDTO.getEmail());
		NotificationDTO noti = new NotificationDTO();
		noti.setUserId(user.getId());
		noti.setMessage("Your password was reset successfully.");
		noti.setAction("Password Reset");
		notificationService.sendNotification(noti);
		return new ResponseDTO("Password changed successfully.");
	}

	private void checkOtp(String email, String otp) throws JobPortalException {
		OTP saved = otpRepository.findById(email).orElseThrow(() -> new JobPortalException("OTP_NOT_FOUND"));
		if (saved.getCreationTime().isBefore(LocalDateTime.now().minusMinutes(OTP_VALID_MINUTES))) {
			otpRepository.deleteById(email);
			throw new JobPortalException("OTP_NOT_FOUND");
		}
		if (saved.getAttempts() >= OTP_MAX_ATTEMPTS) {
			otpRepository.deleteById(email);
			throw new JobPortalException("OTP_TOO_MANY_ATTEMPTS");
		}
		if (otp == null || !passwordEncoder.matches(otp, saved.getOtpHash())) {
			saved.setAttempts(saved.getAttempts() + 1);
			otpRepository.save(saved);
			throw new JobPortalException("OTP_INCORRECT");
		}
	}

	@Override
	public UserDTO getUserByEmail(String email) throws JobPortalException {
		return userRepository.findByEmail(email).orElseThrow(() -> new JobPortalException("USER_NOT_FOUND")).toDTO();
	}
}
