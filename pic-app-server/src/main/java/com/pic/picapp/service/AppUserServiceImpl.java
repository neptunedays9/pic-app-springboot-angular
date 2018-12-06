package com.pic.picapp.service;

import java.util.List;
import java.util.Optional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pic.picapp.domain.AppUser;
import com.pic.picapp.dao.AppUserRepository;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class AppUserServiceImpl implements AppUserService {

  @NonNull
  private AppUserRepository appUserRepository;

  @Override
  public Optional<AppUser> getByGoogleId(String id) {
    return appUserRepository.findById(id);
  }

  @Override
  public void createAppUser(AppUser appUser) {
    appUserRepository.save(appUser);
  }

  @Override
  public List<AppUser> getAllAppUsers() {
    return appUserRepository.findAll();
  }

  @Override
  public void save(AppUser appUser) {
    appUserRepository.save(appUser);
  }
}
