package com.kiran.hostel;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
public class SecurityConfig {
 @Bean PasswordEncoder encoder(){return new BCryptPasswordEncoder();}
 @Bean UserDetailsService userDetails(JdbcTemplate db){ return email -> db.query("select email,password,role from users where email=?", (rs,n)->User.withUsername(rs.getString(1)).password(rs.getString(2)).roles(rs.getString(3)).build(), email.toLowerCase()).stream().findFirst().orElseThrow(()->new UsernameNotFoundException("Invalid credentials")); }
 @Bean SecurityFilterChain security(HttpSecurity http) throws Exception {
  return http.authorizeHttpRequests(a->a.requestMatchers("/","/index.html","/assets/**","/favicon.svg","/api/csrf","/api/health","/api/register").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/warden/**").hasAnyRole("ADMIN","WARDEN")
    .requestMatchers("/api/kitchen/**").hasAnyRole("ADMIN","CHEF")
    .requestMatchers(HttpMethod.POST,"/api/complaints","/api/leaves","/api/mess/feedback","/api/mess/preferences").hasRole("STUDENT")
    .requestMatchers("/api/invoices").hasAnyRole("ADMIN","STUDENT")
    .requestMatchers("/api/rooms","/api/allocations","/api/complaints","/api/leaves","/api/attendance").hasAnyRole("ADMIN","WARDEN","STUDENT")
    .anyRequest().authenticated())
   .formLogin(f->f.loginProcessingUrl("/api/login").successHandler((q,s,a)->{s.setContentType("application/json");s.getWriter().write("{\"ok\":true}");}).failureHandler((q,s,e)->{s.setStatus(401);s.setContentType("application/json");s.getWriter().write("{\"message\":\"Incorrect email or password\"}");}))
   .logout(l->l.logoutUrl("/api/logout").logoutSuccessHandler((q,s,a)->s.setStatus(204)))
   .exceptionHandling(e->e.authenticationEntryPoint((q,s,x)->s.sendError(401)).accessDeniedHandler((q,s,x)->s.sendError(403)))
   .build();
 }
}
