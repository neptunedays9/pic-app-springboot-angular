package com.pic.picapp.service;

import java.util.List;
import java.util.Map;
import lombok.NonNull;
import org.springframework.security.core.GrantedAuthority;
import com.pic.picapp.domain.AppRole;

public interface AppRoleService {

  AppRole getAppRole(@NonNull final String id);

  Map<GrantedAuthority, AppRole> getMappedAppRoles();

  List<AppRole> getAppRoles();

  void save(AppRole appRole);

  void delete(String id);
}
