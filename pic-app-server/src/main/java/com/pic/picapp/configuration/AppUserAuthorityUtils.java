package com.pic.picapp.configuration;

import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import com.pic.picapp.domain.AppUser;
import lombok.NoArgsConstructor;

@NoArgsConstructor
final class AppUserAuthorityUtils {

  static final List<GrantedAuthority> ADMIN_ROLES =
      AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");

  private static final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");

  public static List<GrantedAuthority> createAuthorities(final AppUser appUser) {
    // TODO: Conditions for setting roles
    return USER_ROLES;
  }
}
