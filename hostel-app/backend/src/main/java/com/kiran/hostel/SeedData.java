package com.kiran.hostel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
@Component
public class SeedData implements CommandLineRunner {
 final HostelService s;final Environment env;
 SeedData(HostelService s,Environment env){this.s=s;this.env=env;}
 @Override @Transactional public void run(String... args){
 boolean demo=env.acceptsProfiles(Profiles.of("demo"));
 String password=env.getProperty("app.admin.password","");
 if(!demo&&password.length()<12)throw new IllegalStateException("Set ADMIN_PASSWORD to at least 12 characters before deploying");
 if(s.database().queryForObject("select count(*) from users",Integer.class)>0)return;
 String email=env.getProperty("app.admin.email","admin@hostel.local");
 s.database().update("insert into users(name,email,roll_no,phone,department,password,role) values(?,?,?,?,?,?,'ADMIN')","Hostel Administrator",email,"ADMIN","9000000000","Administration",s.passwordEncoder().encode(demo?"Admin@12345":password));
 if(!demo)return;
 s.database().update("insert into users(name,email,roll_no,phone,department,password,role) values(?,?,?,?,?,?,'WARDEN')","Demo Warden","warden@hostel.local","WARDEN-DEMO","9000000011","Hostel Office",s.passwordEncoder().encode("Warden@12345"));
 s.database().update("insert into users(name,email,roll_no,phone,department,password,role) values(?,?,?,?,?,?,'CHEF')","Demo Chef","chef@hostel.local","CHEF-DEMO","9000000012","Mess",s.passwordEncoder().encode("Chef@12345"));
 String[] names={"Kiran Boda","Aarav Kumar","Meera Rao","Sana Ali","Vikram Reddy","Ananya Das"};
 for(int i=0;i<names.length;i++)s.register(new Requests.Registration(names[i],i==0?"student@hostel.local":"student"+i+"@hostel.local","22CSE00"+(i+1),"900000000"+i,"Computer Science","Student@12345"));
 for(String block:new String[]{"A","B"})for(int i=101;i<=104;i++)s.database().update("insert into rooms(block_name,number,capacity,monthly_fee) values(?,?,?,?)",block,""+i,3,3500);
 var students=s.students();int k=0;for(var student:students){long id=((Number)student.get("id")).longValue();s.allocate(new Requests.Allocation(id,k++<3?1:2),email);s.invoice(new Requests.Invoice(id,"Hostel & mess • "+LocalDate.now().getMonth(),new java.math.BigDecimal("3500"),LocalDate.now().plusDays(7)),email);s.attendance(new Requests.Attendance(id,LocalDate.now(),"PRESENT"),email);}
 s.notice(new Requests.Notice("Welcome to HostelHub","This demonstration uses fictional records. Explore rooms, fees, requests and notices using the administrator and student accounts."),email);
 s.notice(new Requests.Notice("Weekly maintenance window","Routine water tank cleaning is scheduled on Sunday, 10 AM–12 PM. Please store drinking water in advance."),email);
 s.complaint(new Requests.Complaint("Maintenance","Study light needs repair","The study light near the desk is flickering. Please arrange an inspection."),"student@hostel.local");
 }
}
