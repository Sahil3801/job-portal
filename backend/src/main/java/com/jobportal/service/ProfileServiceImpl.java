package com.jobportal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.ProfileDTO;
import com.jobportal.dto.UserDTO;
import com.jobportal.entity.Profile;
import com.jobportal.exception.JobPortalException;
import com.jobportal.repository.ProfileRepository;
import com.jobportal.utility.Utilities;
import com.jobportal.utility.CurrentUser;
import com.jobportal.jwt.CustomUserDetails;
import com.jobportal.dto.AccountType;
import java.util.Objects;

@Service("profileService")
public class ProfileServiceImpl implements ProfileService {

	@Autowired
	private ProfileRepository profileRepository;
	
	@Override
	public Long createProfile(UserDTO userDTO) throws JobPortalException {
		Profile profile=new Profile();
		profile.setId(Utilities.getNextSequenceId("profiles"));
		profile.setEmail(userDTO.getEmail());
		profile.setName(userDTO.getName());
		profile.setSkills(new ArrayList<>());
		profile.setExperiences(new ArrayList<>());
		profile.setCertifications(new ArrayList<>());
		profile.setSavedJobs(new ArrayList<>());
		profile.setTotalExp(0L);
		profileRepository.save(profile);
		return profile.getId();
	}

	@Override
	public ProfileDTO getProfile(Long id) throws JobPortalException {
		return profileRepository.findById(id).orElseThrow(()->new JobPortalException("PROFILE_NOT_FOUND")).toDTO();
	}

	@Override
	public ProfileDTO updateProfile(ProfileDTO profileDTO) throws JobPortalException {
		CustomUserDetails user = CurrentUser.get();
		if (user.getAccountType() != AccountType.ADMIN && !Objects.equals(user.getProfileId(), profileDTO.getId()))
			throw new JobPortalException("ACCESS_DENIED");
		Profile existing = profileRepository.findById(profileDTO.getId()).orElseThrow(()->new JobPortalException("PROFILE_NOT_FOUND"));
		profileDTO.setEmail(existing.getEmail()); // email is tied to the login account
		profileRepository.save(profileDTO.toEntity());
		return profileDTO;
	}

	@Override
	public List<ProfileDTO> getAllProfiles() throws JobPortalException {
		return profileRepository.findAll().stream().map((x)->x.toDTO()).toList();
	}
	

}
