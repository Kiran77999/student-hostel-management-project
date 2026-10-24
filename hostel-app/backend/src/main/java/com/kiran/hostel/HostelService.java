package com.kiran.hostel;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.time.LocalDate;
import java.util.*;
import static com.kiran.hostel.Requests.*;
@Service
public class HostelService {
 final JdbcTemplate db; final PasswordEncoder encoder;
 HostelService(JdbcTemplate db,PasswordEncoder encoder){this.db=db;this.encoder=encoder;}
 public JdbcTemplate database(){return db;}
 public PasswordEncoder passwordEncoder(){return encoder;}
 static void require(boolean ok,String message){if(!ok)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,message);}
 Map<String,Object> me(String email){return db.queryForMap("select id,name,email,roll_no,phone,department,role from users where email=?",email);}
 long id(String email){return ((Number)me(email).get("id")).longValue();}
 boolean studentAccount(String email){return me(email).get("role").equals("STUDENT");}
 boolean warden(String email){return me(email).get("role").equals("WARDEN");}
 boolean residenceManager(String email){return admin(email)||warden(email);}
 boolean admin(String email){return me(email).get("role").equals("ADMIN");}
 void audit(String email,String action){db.update("insert into audit_log(actor,action) values(?,?)",email,action);}
 void student(long id){require(db.queryForObject("select count(*) from users where id=? and role='STUDENT'",Integer.class,id)==1,"Student not found");}
 @Transactional public void register(Registration r){db.update("insert into users(name,email,roll_no,phone,department,password,role) values(?,?,?,?,?,?,'STUDENT')",r.name().trim(),r.email().trim().toLowerCase(),r.rollNo().trim(),r.phone(),r.department(),encoder.encode(r.password()));}
 List<Map<String,Object>> rooms(){return db.queryForList("select r.*, (select count(*) from allocations a where a.room_id=r.id) occupied from rooms r order by block_name,number");}
 List<Map<String,Object>> students(){return db.queryForList("select u.id,u.name,u.email,u.roll_no,u.phone,u.department,r.block_name,r.number from users u left join allocations a on a.student_id=u.id left join rooms r on r.id=a.room_id where u.role='STUDENT' order by u.name");}
 List<Map<String,Object>> allocations(String email){return db.queryForList("select a.*,u.name,u.roll_no,r.block_name,r.number,r.monthly_fee from allocations a join users u on u.id=a.student_id join rooms r on r.id=a.room_id"+(residenceManager(email)?"":" where a.student_id=?"),residenceManager(email)?new Object[]{}:new Object[]{id(email)});}
 @Transactional public void room(Room r,String actor){db.update("insert into rooms(block_name,number,capacity,monthly_fee) values(?,?,?,?)",r.block(),r.number(),r.capacity(),r.monthlyFee());audit(actor,"Created room "+r.block()+" / "+r.number());}
 @Transactional public void allocate(Allocation a,String actor){
  student(a.studentId());
  db.queryForMap("select id from users where id=? for update",a.studentId());
  var room=db.queryForList("select * from rooms where id=? for update",a.roomId());require(!room.isEmpty(),"Room not found");
  require(room.get(0).get("status").equals("AVAILABLE"),"Room is unavailable");
  require(db.queryForObject("select count(*) from allocations where student_id=?",Integer.class,a.studentId())==0,"Student already has a room; vacate it first");
  int count=db.queryForObject("select count(*) from allocations where room_id=?",Integer.class,a.roomId());
  require(count<((Number)room.get(0).get("capacity")).intValue(),"Room is full");
  db.update("insert into allocations(student_id,room_id,allocated_on) values(?,?,?)",a.studentId(),a.roomId(),LocalDate.now());audit(actor,"Allocated student #"+a.studentId()+" to room #"+a.roomId());
 }
 @Transactional public void vacate(long student,String actor){require(db.update("delete from allocations where student_id=?",student)==1,"Allocation not found");audit(actor,"Vacated student #"+student);}
 List<Map<String,Object>> records(String table,String email){
  require(Set.of("invoices","complaints","leave_requests","attendance").contains(table),"Invalid resource");
  return db.queryForList("select t.*,u.name,u.roll_no from "+table+" t join users u on u.id=t.student_id"+(residenceManager(email)&&!table.equals("invoices")||admin(email)?"":" where t.student_id=?")+" order by t.id desc",residenceManager(email)&&!table.equals("invoices")||admin(email)?new Object[]{}:new Object[]{id(email)});
 }
 @Transactional public void invoice(Invoice i,String actor){student(i.studentId());db.update("insert into invoices(student_id,description,amount,due_date) values(?,?,?,?)",i.studentId(),i.description(),i.amount(),i.dueDate());audit(actor,"Issued fee record for student #"+i.studentId());}
 @Transactional public void pay(long id,Payment p,String actor){var rows=db.queryForList("select * from invoices where id=? for update",id);require(!rows.isEmpty(),"Invoice not found");require(!Boolean.TRUE.equals(rows.get(0).get("paid")),"Invoice already paid");require(db.update("update invoices set paid=true,paid_on=?,reference_no=? where id=? and paid=false",LocalDate.now(),p.reference(),id)==1,"Invoice already paid");audit(actor,"Recorded offline payment for invoice #"+id);}
 @Transactional public void complaint(Complaint c,String email){require(studentAccount(email),"Use a student account to submit a complaint");require(Set.of("Maintenance","Water","Electricity","Mess","Other").contains(c.category()),"Invalid category");db.update("insert into complaints(student_id,category,subject,details) values(?,?,?,?)",id(email),c.category(),c.subject(),c.details());}
 @Transactional public void leave(Leave l,String email){require(studentAccount(email),"Use a student account to request leave");require(!l.fromDate().isBefore(LocalDate.now())&&!l.toDate().isBefore(l.fromDate()),"Choose a valid current or future date range");db.queryForMap("select id from users where id=? for update",id(email));require(db.queryForObject("select count(*) from leave_requests where student_id=? and status<>'REJECTED' and from_date<=? and to_date>=?",Integer.class,id(email),l.toDate(),l.fromDate())==0,"An overlapping leave request already exists");db.update("insert into leave_requests(student_id,from_date,to_date,reason) values(?,?,?,?)",id(email),l.fromDate(),l.toDate(),l.reason());}
 @Transactional public void decision(String table,long id,Decision d,String actor){
  require(table.equals("complaints")?Set.of("OPEN","IN_PROGRESS","RESOLVED").contains(d.status()):Set.of("APPROVED","REJECTED").contains(d.status()),"Invalid status");
  String condition=table.equals("leave_requests")?" and status='PENDING'":"";
  require(db.update("update "+table+" set status=?,response=? where id=?"+condition,d.status(),d.response(),id)==1,"Record missing or already decided");audit(actor,"Updated "+table+" #"+id+" to "+d.status());
 }
 @Transactional public void notice(Notice n,String actor){db.update("insert into notices(title,body) values(?,?)",n.title(),n.body());audit(actor,"Published notice: "+n.title());}
 @Transactional public void deleteNotice(long id,String actor){require(db.update("delete from notices where id=?",id)==1,"Notice not found");audit(actor,"Removed notice #"+id);}
 @Transactional public void attendance(Attendance a,String actor){student(a.studentId());require(!a.date().isAfter(LocalDate.now()),"Cannot mark future attendance");require(Set.of("PRESENT","ABSENT","ON_LEAVE").contains(a.status()),"Invalid attendance status");db.queryForMap("select id from users where id=? for update",a.studentId());if(db.update("update attendance set status=? where student_id=? and attendance_date=?",a.status(),a.studentId(),a.date())==0)db.update("insert into attendance(student_id,attendance_date,status) values(?,?,?)",a.studentId(),a.date(),a.status());audit(actor,"Marked attendance for student #"+a.studentId());}
 @Transactional public void password(Password p,String email){String hash=db.queryForObject("select password from users where email=?",String.class,email);require(encoder.matches(p.currentPassword(),hash),"Current password is incorrect");db.update("update users set password=? where email=?",encoder.encode(p.newPassword()),email);audit(email,"Changed password");}
}
