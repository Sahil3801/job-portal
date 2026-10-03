package com.jobportal.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dto.AccountType;
import com.jobportal.dto.ApplicantDTO;
import com.jobportal.dto.Application;
import com.jobportal.dto.ApplicationStatus;
import com.jobportal.dto.JobDTO;
import com.jobportal.dto.JobStatus;
import com.jobportal.dto.NotificationDTO;
import com.jobportal.entity.Applicant;
import com.jobportal.entity.Job;
import com.jobportal.exception.JobPortalException;
import com.jobportal.jwt.CustomUserDetails;
import com.jobportal.repository.JobRepository;
import com.jobportal.utility.CurrentUser;
import com.jobportal.utility.Utilities;

@Service("jobService")
public class JobServiceImpl implements JobService {

	@Autowired
	private JobRepository jobRepository;

	@Autowired
	private NotificationService notificationService;

	@Override
	public JobDTO postJob(JobDTO jobDTO) throws JobPortalException {
		CustomUserDetails user = CurrentUser.require(AccountType.EMPLOYER);
		if (jobDTO.getJobStatus() == null)
			jobDTO.setJobStatus(JobStatus.ACTIVE);
		if (jobDTO.getId() == null || jobDTO.getId() == 0) {
			jobDTO.setId(Utilities.getNextSequenceId("jobs"));
			jobDTO.setPostTime(LocalDateTime.now());
			jobDTO.setPostedBy(user.getId());
			jobDTO.setApplicants(new ArrayList<>());
			notify(user.getId(), "Job Posted",
					"Job posted successfully for " + jobDTO.getJobTitle() + " at " + jobDTO.getCompany(),
					"/posted-jobs/" + jobDTO.getId());
		} else {
			Job job = findOwnJob(jobDTO.getId(), user);
			// Editing a job must not change its owner or wipe its applicants
			jobDTO.setPostedBy(job.getPostedBy());
			jobDTO.setApplicants(job.getApplicants() == null ? new ArrayList<>()
					: job.getApplicants().stream().map(Applicant::toDTO).toList());
			jobDTO.setPostTime(job.getPostTime());
			if (job.getJobStatus().equals(JobStatus.DRAFT) || jobDTO.getJobStatus().equals(JobStatus.CLOSED))
				jobDTO.setPostTime(LocalDateTime.now());
		}
		return jobRepository.save(jobDTO.toEntity()).toDTO();
	}

	@Override
	public List<JobDTO> getAllJobs() throws JobPortalException {
		return jobRepository.findAll().stream().map((x) -> x.toDTO()).toList();
	}

	@Override
	public JobDTO getJob(Long id) throws JobPortalException {
		return jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND")).toDTO();
	}

	@Override
	public void applyJob(Long id, ApplicantDTO applicantDTO) throws JobPortalException {
		CustomUserDetails user = CurrentUser.require(AccountType.APPLICANT);
		Job job = jobRepository.findById(id).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
		if (!JobStatus.ACTIVE.equals(job.getJobStatus()))
			throw new JobPortalException("JOB_NOT_ACTIVE");
		List<Applicant> applicants = job.getApplicants() == null ? new ArrayList<>() : new ArrayList<>(job.getApplicants());
		if (applicants.stream().anyMatch((x) -> Objects.equals(x.getApplicantId(), user.getId())))
			throw new JobPortalException("JOB_APPLIED_ALREADY");
		applicantDTO.setApplicantId(user.getId());
		applicantDTO.setProfileId(user.getProfileId());
		applicantDTO.setApplicationStatus(ApplicationStatus.APPLIED);
		applicantDTO.setTimestamp(LocalDateTime.now());
		applicantDTO.setInterviewTime(null);
		applicants.add(applicantDTO.toEntity());
		job.setApplicants(applicants);
		jobRepository.save(job);
		notify(job.getPostedBy(), "New Applicant", applicantDTO.getName() + " applied for " + job.getJobTitle(),
				"/posted-jobs/" + job.getId());
	}

	@Override
	public List<JobDTO> getHistory(Long id, ApplicationStatus applicationStatus) throws JobPortalException {
		CustomUserDetails user = CurrentUser.get();
		return jobRepository.findByApplicantIdAndApplicationStatus(user.getId(), applicationStatus).stream()
				.map((x) -> x.toDTO()).toList();
	}

	@Override
	public List<JobDTO> getJobsPostedBy(Long id) throws JobPortalException {
		CustomUserDetails user = CurrentUser.require(AccountType.EMPLOYER);
		return jobRepository.findByPostedBy(user.getId()).stream().map((x) -> x.toDTO()).toList();
	}

	@Override
	public void changeAppStatus(Application application) throws JobPortalException {
		CustomUserDetails user = CurrentUser.require(AccountType.EMPLOYER);
		Job job = findOwnJob(application.getId(), user);
		ApplicationStatus status = application.getApplicationStatus();
		if (status != ApplicationStatus.INTERVIEWING && status != ApplicationStatus.OFFERED
				&& status != ApplicationStatus.REJECTED)
			throw new JobPortalException("ACCESS_DENIED");
		Applicant applicant = findApplicant(job, application.getApplicantId());
		applicant.setApplicationStatus(status);
		if (status == ApplicationStatus.INTERVIEWING) {
			applicant.setInterviewTime(application.getInterviewTime());
			notify(applicant.getApplicantId(), "Interview Scheduled",
					"Interview scheduled for " + job.getJobTitle() + " at " + job.getCompany(), "/job-history");
		} else if (status == ApplicationStatus.OFFERED) {
			notify(applicant.getApplicantId(), "Job Offer",
					"You have an offer for " + job.getJobTitle() + " at " + job.getCompany(), "/job-history");
		} else {
			notify(applicant.getApplicantId(), "Application Update",
					"Your application for " + job.getJobTitle() + " at " + job.getCompany() + " was not selected",
					"/job-history");
		}
		jobRepository.save(job);
	}

	@Override
	public void respondToOffer(Long jobId, boolean accept) throws JobPortalException {
		CustomUserDetails user = CurrentUser.require(AccountType.APPLICANT);
		Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
		Applicant applicant = findApplicant(job, user.getId());
		if (applicant.getApplicationStatus() != ApplicationStatus.OFFERED)
			throw new JobPortalException("OFFER_NOT_PENDING");
		applicant.setApplicationStatus(accept ? ApplicationStatus.ACCEPTED : ApplicationStatus.DECLINED);
		jobRepository.save(job);
		notify(job.getPostedBy(), accept ? "Offer Accepted" : "Offer Declined",
				applicant.getName() + (accept ? " accepted" : " declined") + " your offer for " + job.getJobTitle(),
				"/posted-jobs/" + job.getId());
	}

	private Job findOwnJob(Long jobId, CustomUserDetails user) throws JobPortalException {
		Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobPortalException("JOB_NOT_FOUND"));
		if (user.getAccountType() != AccountType.ADMIN && !Objects.equals(job.getPostedBy(), user.getId()))
			throw new JobPortalException("ACCESS_DENIED");
		return job;
	}

	private Applicant findApplicant(Job job, Long applicantId) throws JobPortalException {
		if (job.getApplicants() == null)
			throw new JobPortalException("APPLICANT_NOT_FOUND");
		return job.getApplicants().stream().filter((x) -> Objects.equals(x.getApplicantId(), applicantId))
				.findFirst().orElseThrow(() -> new JobPortalException("APPLICANT_NOT_FOUND"));
	}

	private void notify(Long userId, String action, String message, String route) {
		NotificationDTO noti = new NotificationDTO();
		noti.setUserId(userId);
		noti.setAction(action);
		noti.setMessage(message);
		noti.setRoute(route);
		try {
			notificationService.sendNotification(noti);
		} catch (JobPortalException e) {
			// A failed notification should not undo the main action
			e.printStackTrace();
		}
	}
}
