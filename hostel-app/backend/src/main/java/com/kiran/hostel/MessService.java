package com.kiran.hostel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.*;
import static com.kiran.hostel.HostelService.require;
import static com.kiran.hostel.Requests.*;
@Service
public class MessService {
 private final HostelService s;
 MessService(HostelService s){this.s=s;}
 List<Map<String,Object>> staff(){return s.database().queryForList("select id,name,email,roll_no,phone,department,role from users where role in ('WARDEN','CHEF') order by role,name");}
 @Transactional public void createStaff(Staff r,String actor){
  require(Set.of("WARDEN","CHEF").contains(r.role()),"Choose WARDEN or CHEF");
  s.database().update("insert into users(name,email,roll_no,phone,department,password,role) values(?,?,?,?,?,?,?)",r.name().trim(),r.email().trim().toLowerCase(),r.rollNo().trim(),r.phone(),r.department(),s.passwordEncoder().encode(r.password()),r.role());s.audit(actor,"Created "+r.role()+" account: "+r.email().trim().toLowerCase());
 }
 List<Map<String,Object>> menus(){return s.database().queryForList("select id,menu_date,breakfast,lunch,dinner,updated_at from mess_menu order by menu_date desc limit 60");}
 @Transactional public void menu(Menu m,String actor){require(!m.date().isBefore(LocalDate.now()),"Menu date must be today or later");
  // A single actor row serializes repeated submissions from the same account; the unique date also prevents duplicates across chefs.
  s.database().queryForMap("select id from users where email=? for update",actor);
  if(s.database().update("update mess_menu set breakfast=?,lunch=?,dinner=?,updated_by=?,updated_at=CURRENT_TIMESTAMP where menu_date=?",m.breakfast(),m.lunch(),m.dinner(),actor,m.date())==0)
   s.database().update("insert into mess_menu(menu_date,breakfast,lunch,dinner,updated_by) values(?,?,?,?,?)",m.date(),m.breakfast(),m.lunch(),m.dinner(),actor);
  s.audit(actor,"Published mess menu for "+m.date());
 }
 List<Map<String,Object>> preferences(String actor){return s.studentAccount(actor)?s.database().queryForList("select meal_date,breakfast,lunch,dinner from meal_preferences where student_id=? order by meal_date desc limit 60",s.id(actor)):List.of();}
 @Transactional public void preferences(Meals m,String actor){require(!m.date().isBefore(LocalDate.now()),"Meal preferences must be for today or later");long id=s.id(actor);s.database().queryForMap("select id from users where id=? for update",id);
  if(s.database().update("update meal_preferences set breakfast=?,lunch=?,dinner=? where student_id=? and meal_date=?",m.breakfast(),m.lunch(),m.dinner(),id,m.date())==0)
   s.database().update("insert into meal_preferences(student_id,meal_date,breakfast,lunch,dinner) values(?,?,?,?,?)",id,m.date(),m.breakfast(),m.lunch(),m.dinner());
 }
 Map<String,Object> counts(LocalDate day){
  long allocated=s.database().queryForObject("select count(*) from allocations",Long.class);
  long away=s.database().queryForObject("select count(*) from allocations a where exists(select 1 from leave_requests l where l.student_id=a.student_id and l.status='APPROVED' and l.from_date<=? and l.to_date>=?)",Long.class,day,day);
  var result=new LinkedHashMap<String,Object>();result.put("date",day);result.put("allocated",allocated);result.put("onLeave",away);result.put("eligible",allocated-away);
  for(String meal:List.of("breakfast","lunch","dinner")){
   long optOut=s.database().queryForObject("select count(*) from allocations a join meal_preferences m on m.student_id=a.student_id and m.meal_date=? where m."+meal+"=false and not exists(select 1 from leave_requests l where l.student_id=a.student_id and l.status='APPROVED' and l.from_date<=? and l.to_date>=?)",Long.class,day,day,day);
   result.put(meal,allocated-away-optOut);
  }
  result.put("basis","Allocated residents, excluding approved leave and meal opt-outs. Counts are planning estimates, not meals served.");return result;
 }
 List<Map<String,Object>> feedback(String actor){
  if(s.studentAccount(actor))return s.database().queryForList("select id,meal_date,meal_type,rating,comments,status,response,created_at from food_feedback where student_id=? order by id desc",s.id(actor));
  return s.database().queryForList("select id,meal_date,meal_type,rating,comments,status,response,created_at from food_feedback order by id desc");
 }
 @Transactional public void feedback(FoodFeedback f,String actor){require(!f.date().isAfter(LocalDate.now()),"Cannot review a future meal");require(Set.of("BREAKFAST","LUNCH","DINNER").contains(f.mealType()),"Invalid meal type");
  s.database().update("insert into food_feedback(student_id,meal_date,meal_type,rating,comments) values(?,?,?,?,?)",s.id(actor),f.date(),f.mealType(),f.rating(),f.comments());
 }
 @Transactional public void respond(long id,Decision d,String actor){require(Set.of("OPEN","RESOLVED").contains(d.status()),"Choose OPEN or RESOLVED");require(s.database().update("update food_feedback set status=?,response=? where id=?",d.status(),d.response(),id)==1,"Feedback not found");s.audit(actor,"Responded to food feedback #"+id);}
}
