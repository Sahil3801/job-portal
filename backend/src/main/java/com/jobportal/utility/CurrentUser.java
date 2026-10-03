package com.jobportal.utility;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.jobportal.dto.AccountType;
import com.jobportal.exception.JobPortalException;
import com.jobportal.jwt.CustomUserDetails;

// The logged-in user, taken from the JWT rather than from request bodies,
// so users can only act on their own data.
public class CurrentUser {

	public static CustomUserDetails get() throws JobPortalException {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails user))
			throw new JobPortalException("ACCESS_DENIED");
		return user;
	}

	public static CustomUserDetails require(AccountType... allowed) throws JobPortalException {
		CustomUserDetails user = get();
		if (user.getAccountType() == AccountType.ADMIN)
			return user;
		for (AccountType type : allowed)
			if (user.getAccountType() == type)
				return user;
		throw new JobPortalException("ACCESS_DENIED");
	}
}
