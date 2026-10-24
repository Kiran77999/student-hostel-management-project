package com.kiran.hostel;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.security.Principal;
import java.time.LocalDate;
import static com.kiran.hostel.Requests.*;
@RestController @RequestMapping("/api")
public class RoleController {
 final HostelService s;final MessService m;
 RoleController(HostelService s,MessService m){this.s=s;this.m=m;}
 @GetMapping("/admin/staff") Object staff(){return m.staff();}
 @PostMapping("/admin/staff") void staff(@Valid @RequestBody Staff r,Principal p){m.createStaff(r,p.getName());}
 @GetMapping("/warden/students") Object students(){return s.students();}
 @PostMapping("/warden/allocations") void allocate(@Valid @RequestBody Allocation r,Principal p){s.allocate(r,p.getName());}
 @DeleteMapping("/warden/allocations/{student}") void vacate(@PathVariable long student,Principal p){s.vacate(student,p.getName());}
 @PatchMapping("/warden/complaints/{id}") void complaint(@PathVariable long id,@Valid @RequestBody Decision r,Principal p){s.decision("complaints",id,r,p.getName());}
 @PatchMapping("/warden/leaves/{id}") void leave(@PathVariable long id,@Valid @RequestBody Decision r,Principal p){s.decision("leave_requests",id,r,p.getName());}
 @PostMapping("/warden/attendance") void attendance(@Valid @RequestBody Attendance r,Principal p){s.attendance(r,p.getName());}
 @GetMapping("/mess/menu") Object menus(){return m.menus();}
 @PutMapping("/kitchen/menu") void menu(@Valid @RequestBody Menu r,Principal p){m.menu(r,p.getName());}
 @GetMapping("/mess/preferences") Object preferences(Principal p){return m.preferences(p.getName());}
 @PostMapping("/mess/preferences") void preferences(@Valid @RequestBody Meals r,Principal p){m.preferences(r,p.getName());}
 @GetMapping("/kitchen/counts") Object counts(@RequestParam(required=false) LocalDate date){return m.counts(date==null?LocalDate.now():date);}
 @GetMapping("/warden/meal-counts") Object wardenCounts(@RequestParam(required=false) LocalDate date){return m.counts(date==null?LocalDate.now():date);}
 @GetMapping("/mess/feedback") Object feedback(Principal p){return m.feedback(p.getName());}
 @PostMapping("/mess/feedback") void feedback(@Valid @RequestBody FoodFeedback r,Principal p){m.feedback(r,p.getName());}
 @PatchMapping("/kitchen/feedback/{id}") void response(@PathVariable long id,@Valid @RequestBody Decision r,Principal p){m.respond(id,r,p.getName());}
}
