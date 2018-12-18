package com.pic.picapp.configuration;

import com.pic.picapp.dao.SceneRepository;
import com.pic.picapp.dao.StoryRepository;
import com.pic.picapp.dao.UserRepository;
import com.pic.picapp.domain.Scene;
import com.pic.picapp.domain.Story;
import com.pic.picapp.domain.User;
import com.pic.picapp.util.SceneModel;
import com.pic.picapp.util.StoryModel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

//import org.bouncycastle.util.Arrays;
import org.apache.el.stream.Optional;
import org.hibernate.engine.internal.Collections;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;

import org.springframework.boot.context.properties.NestedConfigurationProperty;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.oauth2.client.token.AccessTokenProvider;
import org.springframework.security.oauth2.client.token.AccessTokenProviderChain;
import org.springframework.security.oauth2.client.token.OAuth2AccessTokenSupport;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeAccessTokenProvider;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.ForwardAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.filter.CommonsRequestLoggingFilter;
import org.springframework.web.filter.CompositeFilter;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.io.IOException;
//import org.springframework.security.web.RedirectStrategy;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@SpringBootApplication
@RestController
@EnableOAuth2Client
@EnableAuthorizationServer
@EnableWebSecurity
@Order(200)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    OAuth2ClientContext oauth2ClientContext;

//    @Autowired
//    RedirectStrategy redirectStrategy;

    @Autowired
    OAuth2ProtectedResourceDetails resource;

    @Autowired
    ResourceServerProperties resourceServer;

    @Autowired
    RequestHelper requestHelper;

    @Autowired
    CustomOAuth2UserService customOAuth2UserService;

    @RequestMapping("/username")
    public String username(Principal principal) {
        //Map<String, String> map = new LinkedHashMap<>();
        //map.put("name", principal.getName());
        //System.out.println("TEST ******************** " + principal.getName());
        return principal.getName();
    }

    @RequestMapping("/useremail")
    public String useremail(Principal principal) {
        return principal.getName();
    }

    @RequestMapping("/user")
    public Principal user(Principal principal) {
        return principal;
    }

    @GetMapping("/resource")
    @ResponseBody
    public Map<String, Object> home() {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("id", UUID.randomUUID().toString());
        model.put("content", "Hello World");
        return model;
    }

    @GetMapping(path="/callback")
    public String callback() {
        System.out.println("redirecting to home page");

        Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();
        System.out.println("PICAPP ******************** " + auth.getPrincipal());

        //    UserDetails userDetails = (UserDetails) auth.getPrincipal();
        //    System.out.println("User has authorities: " +
        //        userDetails.getUsername());
        return "/";
    }

    @RequestMapping(path = "/session")
    private Map<String, String> userInfo(Principal principal) {
        System.out.println("PICAPP ******************** session" );
        Map<String, String> map = new LinkedHashMap<>();
        map.put("name", principal.getName());
        return map;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http.antMatcher("/**")
                .authorizeRequests()
                    .antMatchers("/","/*.js","/index.html", "/signin**", "/user**", "/login**", "/webjars/**", "/error**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                .exceptionHandling()
                    .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/"))
                    .and()
                .formLogin()
                    .successHandler(new ForwardAuthenticationSuccessHandler("/session"))
                    .and()
                .logout()
                    .logoutSuccessUrl("/").permitAll()
                    .and()
                .csrf()
                    .csrfTokenRepository(this.getCsrfTokenRepository())
                    .and()
//                .oauth2Login()
//                    .userInfoEndpoint()
//                        .userService(customOAuth2UserService)
//                        .and()
//                    .successHandler(new ForwardAuthenticationSuccessHandler("/session"))
//                    .and()
                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
        // @formatter:on
        System.out.println("PICAPP ******************** 2");

    }

    private CsrfTokenRepository getCsrfTokenRepository() {
        CookieCsrfTokenRepository tokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        tokenRepository.setCookiePath("/");
        return tokenRepository;
    }

    @Configuration
    @EnableResourceServer
    protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            // @formatter:off
            http.antMatcher("/me").authorizeRequests().anyRequest().authenticated();
            // @formatter:on

            System.out.println("PICAPP ******************** 1 " );

        }
    }

//    @Bean
//    public FilterRegistrationBean<OAuth2ClientContextFilter> oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
//        FilterRegistrationBean<OAuth2ClientContextFilter> registration = new FilterRegistrationBean<OAuth2ClientContextFilter>();
//        registration.setFilter(filter);
//        registration.setOrder(-100);
//        return registration;
//    }

    @Bean
    @ConfigurationProperties("github")
    public ClientResources github() {
        return new ClientResources();
    }

    @Bean
    @ConfigurationProperties("facebook")
    public ClientResources facebook() {
        return new ClientResources();
    }

    @Autowired
    private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {
        CommonsRequestLoggingFilter loggingFilter = new CommonsRequestLoggingFilter();
        loggingFilter.setIncludeClientInfo(true);
        loggingFilter.setIncludeQueryString(true);
        loggingFilter.setIncludePayload(true);
        return loggingFilter;
    }

    private Filter ssoFilter() {
        CompositeFilter filter = new CompositeFilter();
        List<Filter> filters = new ArrayList<>();
        filters.add(ssoFilter(facebook(), "/login/facebook"));
        filters.add(ssoFilter(github(), "/login/github"));
        filter.setFilters(filters);
        return filter;
    }

    private Filter ssoFilter(ClientResources client, String path) {
        OAuth2ClientAuthenticationProcessingFilter filter = new OAuth2ClientAuthenticationProcessingFilter(
                path);
        OAuth2RestTemplate template = new OAuth2RestTemplate(client.getClient(), oauth2ClientContext);
        filter.setRestTemplate(template);
        UserInfoTokenServices tokenServices = new UserInfoTokenServices(
                client.getResource().getUserInfoUri(), client.getClient().getClientId());
        tokenServices.setRestTemplate(template);
        filter.setTokenServices(tokenServices);
        //filter.setAuthenticationSuccessHandler(customAuthenticationSuccessHandler);
        return filter;
    }

//    private Filter oauthFilter() {
//        OAuth2ClientAuthenticationProcessingFilter oauthFilter = new OAuth2ClientAuthenticationProcessingFilter("/login");
//        OAuth2RestTemplate oauthTemplate = new OAuth2RestTemplate(resource, oauth2ClientContext);
//        OAuth2AccessTokenSupport authAccessProvider = new AuthorizationCodeAccessTokenProvider();
//        // Set request factory for '/oauth/token'
//        authAccessProvider.setRequestFactory(requestHelper.getRequestFactory());
//        AccessTokenProvider accessTokenProvider = new AccessTokenProviderChain(Arrays.<AccessTokenProvider> asList(
//                (AuthorizationCodeAccessTokenProvider)authAccessProvider));
//        oauthTemplate.setAccessTokenProvider(accessTokenProvider);
//        // Set request factory for '/userinfo'
//        oauthTemplate.setRequestFactory(requestHelper.getRequestFactory());
//        oauthFilter.setRestTemplate(oauthTemplate);
//        UserInfoTokenServices userInfoTokenService = new UserInfoTokenServices(resourceServer.getUserInfoUri(), resource.getClientId());
//        userInfoTokenService.setRestTemplate(oauthTemplate);
//        oauthFilter.setTokenServices(userInfoTokenService);
//        return oauthFilter;
//    }
}

class ClientResources {

    @NestedConfigurationProperty
    private AuthorizationCodeResourceDetails client = new AuthorizationCodeResourceDetails();

    @NestedConfigurationProperty
    private ResourceServerProperties resource = new ResourceServerProperties();

    public AuthorizationCodeResourceDetails getClient() {
        return client;
    }

    public ResourceServerProperties getResource() {
        return resource;
    }
}

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // @formatter:off
//        http.antMatcher("/**").authorizeRequests().antMatchers("/", "/user**", "/me**", "/login**", "/webjars/**").permitAll().anyRequest()
//                .authenticated().and().exceptionHandling()
//                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/")).and()
//                .formLogin()
//                .loginPage("/login")
//                .successHandler(new AuthenticationSuccessHandler() {
//                    @Override
//                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                                        Authentication authentication) throws IOException, ServletException {
//                        System.out.println("PICAPP ******************** 2");
//                        //                       redirectStrategy.sendRedirect(request, response, "/");
//                    }
//                })
//                .and().logout()
//                .logoutSuccessUrl("/").permitAll().and().csrf()
//                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
//                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
//        // @formatter:on
//        System.out.println("PICAPP ******************** 2");
//
//    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // @formatter:off
//        http.antMatcher("/**").authorizeRequests().antMatchers("/", "/user**", "/me**", "/login**", "/webjars/**").permitAll().anyRequest()
//                .authenticated().and().exceptionHandling()
//                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/")).and()
//                .formLogin()
//                .loginPage("/login")
//                .successHandler(new AuthenticationSuccessHandler() {
//                    @Override
//                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                                        Authentication authentication) throws IOException, ServletException {
//                        System.out.println("PICAPP ******************** 2");
//                        //                       redirectStrategy.sendRedirect(request, response, "/");
//                    }
//                })
//                .and().logout()
//                .logoutSuccessUrl("/").permitAll().and().csrf()
//                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
//                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
//        // @formatter:on
//        System.out.println("PICAPP ******************** 2");
//
//    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        // @formatter:off
//        http.antMatcher("/**").authorizeRequests().antMatchers("/", "/user**", "/me**", "/login**", "/webjars/**").permitAll().anyRequest()
//                .authenticated().and().exceptionHandling()
//                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/")).and()
//                .formLogin()
//                .loginPage("/login")
//                .successHandler(new AuthenticationSuccessHandler() {
//                    @Override
//                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
//                                                        Authentication authentication) throws IOException, ServletException {
//                        System.out.println("PICAPP ******************** 2");
//                        //                       redirectStrategy.sendRedirect(request, response, "/");
//                    }
//                })
//                .and().logout()
//                .logoutSuccessUrl("/").permitAll().and().csrf()
//                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
//                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
//        // @formatter:on
//        System.out.println("PICAPP ******************** 2");
//
//    }