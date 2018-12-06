package com.pic.picapp.service;

import java.util.List;
import java.util.Optional;
import com.pic.picapp.domain.AppUser;

public interface AppUserService {

  Optional<AppUser> getByGoogleId(String id);
  
  void createAppUser(final AppUser appUser);

  List<AppUser> getAllAppUsers();

  void save(AppUser appUser);
}
