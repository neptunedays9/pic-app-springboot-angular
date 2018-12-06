package com.pic.picapp.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.pic.picapp.domain.AppRole;

public interface AppRoleRepository extends JpaRepository<AppRole, String> {
}
