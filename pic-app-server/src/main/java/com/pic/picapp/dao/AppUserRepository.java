package com.pic.picapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pic.picapp.domain.AppUser;

public interface AppUserRepository extends JpaRepository<AppUser, String> {
}
