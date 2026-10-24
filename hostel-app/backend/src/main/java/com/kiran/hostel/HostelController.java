package com.kiran.hostel;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.web.csrf.CsrfToken;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.*;
import static com.kiran.hostel.Requests.*;
@RestController @RequestMapping("/api")
public class HostelController {
 final HostelService s;
 HostelController(HostelService s){this.s=s;}
 @GetMapping("/health") Map<String,String> health(){s.database().queryForObject("select 1",Integer.class);return Map.of("status","UP","application","HostelHub");}
 @GetMapping("/csrf") Map<String,String> csrf(CsrfToken token){return Map.of("token",token.getToken(),"headerName",token.getHeaderName());}
 @PostMapping("/register") Map<String,Boolean> register(@Valid @RequestBody Registration r){s.register(r);return Map.of("ok",true);}
 @GetMapping("/me") Map<String,Object> me(Principal p){return s.me(p.getName());}
 @PostMapping("/password") void password(@Valid @RequestBody Password r,Principal p){s.password(r,p.getName());}
 @GetMapping("/rooms") Object rooms(){return s.rooms();}
 @GetMapping("/allocations") Object allocations(Principal p){return s.allocations(p.getName());}
 @GetMapping("/invoices") Object invoices(Principal p){return s.records("invoices",p.getName());}
 @GetMapping("/complaints") Object complaints(Principal p){return s.records("complaints",p.getName());}
 @GetMapping("/leaves") Object leaves(Principal p){return s.records("leave_requests",p.getName());}
 @GetMapping("/attendance") Object attendance(Principal p){return s.records("attendance",p.getName());}
 @GetMapping("/notices") Object notices(){return s.database().queryForList("select * from notices order by id desc");}
 @PostMapping("/complaints") void complaint(@Valid @RequestBody Complaint r,Principal p){s.complaint(r,p.getName());}
 @PostMapping("/leaves") void leave(@Valid @RequestBody Leave r,Principal p){s.leave(r,p.getName());}
 @GetMapping("/admin/students") Object students(){return s.students();}
 @PostMapping("/admin/students") void student(@Valid @RequestBody Registration r){s.register(r);}
 @PostMapping("/admin/rooms") void room(@Valid @RequestBody Room r,Principal p){s.room(r,p.getName());}
 @PostMapping("/admin/allocations") void allocate(@Valid @RequestBody Allocation r,Principal p){s.allocate(r,p.getName());}
 @DeleteMapping("/admin/allocations/{student}") void vacate(@PathVariable long student,Principal p){s.vacate(student,p.getName());}
 @PostMapping("/admin/invoices") void invoice(@Valid @RequestBody Invoice r,Principal p){s.invoice(r,p.getName());}
 @PostMapping("/admin/invoices/{id}/payment") void pay(@PathVariable long id,@Valid @RequestBody Payment r,Principal p){s.pay(id,r,p.getName());}
 @PatchMapping("/admin/complaints/{id}") void complaintDecision(@PathVariable long id,@Valid @RequestBody Decision r,Principal p){s.decision("complaints",id,r,p.getName());}
 @PatchMapping("/admin/leaves/{id}") void leaveDecision(@PathVariable long id,@Valid @RequestBody Decision r,Principal p){s.decision("leave_requests",id,r,p.getName());}
 @PostMapping("/admin/notices") void notice(@Valid @RequestBody Notice r,Principal p){s.notice(r,p.getName());}
 @DeleteMapping("/admin/notices/{id}") void deleteNotice(@PathVariable long id,Principal p){s.deleteNotice(id,p.getName());}
 @PostMapping("/admin/attendance") void attendance(@Valid @RequestBody Attendance r,Principal p){s.attendance(r,p.getName());}
 @GetMapping("/admin/audit") Object audit(){return s.database().queryForList("select * from audit_log order by id desc limit 100");}
}
