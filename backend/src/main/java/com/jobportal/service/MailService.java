package com.jobportal.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.jobportal.exception.JobPortalException;

import jakarta.mail.internet.MimeMessage;

// Sends email through Brevo's HTTPS API when BREVO_API_KEY is set (useful on
// hosts that block SMTP ports, such as Render's free tier), otherwise via SMTP.
@Service
public class MailService {

	@Autowired
	private JavaMailSender mailSender;

	@Value("${mail.from:}")
	private String from;

	@Value("${mail.brevo.api-key:}")
	private String brevoApiKey;

	public void send(String to, String subject, String html) throws JobPortalException {
		try {
			if (brevoApiKey != null && !brevoApiKey.isBlank())
				sendWithBrevo(to, subject, html);
			else
				sendWithSmtp(to, subject, html);
		} catch (Exception e) {
			e.printStackTrace();
			throw new JobPortalException("EMAIL_FAILED");
		}
	}

	private void sendWithSmtp(String to, String subject, String html) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
		helper.setFrom(from, "HireHub");
		helper.setTo(to);
		helper.setSubject(subject);
		helper.setText(html, true);
		mailSender.send(message);
	}

	private void sendWithBrevo(String to, String subject, String html) {
		Map<String, Object> body = Map.of(
				"sender", Map.of("email", from, "name", "HireHub"),
				"to", List.of(Map.of("email", to)),
				"subject", subject,
				"htmlContent", html);
		RestClient.create().post()
				.uri("https://api.brevo.com/v3/smtp/email")
				.header("api-key", brevoApiKey)
				.contentType(MediaType.APPLICATION_JSON)
				.body(body)
				.retrieve()
				.toBodilessEntity();
	}
}
