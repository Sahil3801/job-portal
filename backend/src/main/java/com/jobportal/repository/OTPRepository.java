package com.jobportal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.entity.OTP;

public interface OTPRepository extends MongoRepository<OTP, String> {
}
