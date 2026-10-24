package com.kiran.hostel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.test.context.support.WithMockUser;
import java.time.LocalDate;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(properties={"spring.datasource.url=jdbc:h2:mem:roles;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1"})
@AutoConfigureMockMvc @ActiveProfiles("demo") @Transactional
class FourRoleIntegrationTest {
 @Autowired MockMvc mvc;@Autowired JdbcTemplate db;@Autowired MessService mess;
 long student(){return db.queryForObject("select id from users where email='student@hostel.local'",Long.class);}
 @Test @WithMockUser(username="warden@hostel.local",roles="WARDEN") void wardenSeesAllResidentRecords() throws Exception {
  mvc.perform(get("/api/warden/students")).andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(6));
  mvc.perform(get("/api/allocations")).andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(6));
 }
 @Test @WithMockUser(username="warden@hostel.local",roles="WARDEN") void wardenCannotAccessFinanceOrStaff() throws Exception {
  mvc.perform(get("/api/invoices")).andExpect(status().isForbidden());
  mvc.perform(get("/api/admin/staff")).andExpect(status().isForbidden());
  mvc.perform(post("/api/admin/rooms").with(csrf()).contentType("application/json").content("{}")).andExpect(status().isForbidden());
 }
 @Test @WithMockUser(username="warden@hostel.local",roles="WARDEN") void wardenCanMarkAttendance() throws Exception {
  mvc.perform(post("/api/warden/attendance").with(csrf()).contentType("application/json").content("{\"studentId\":"+student()+",\"date\":\""+LocalDate.now()+"\",\"status\":\"ABSENT\"}")).andExpect(status().isOk());
 }
 @Test @WithMockUser(username="warden@hostel.local",roles="WARDEN") void wardenCanApproveLeave() throws Exception {
  db.update("insert into leave_requests(student_id,from_date,to_date,reason) values(?,?,?,?)",student(),LocalDate.now(),LocalDate.now().plusDays(1),"Family visit");
  long id=db.queryForObject("select max(id) from leave_requests",Long.class);
  mvc.perform(patch("/api/warden/leaves/"+id).with(csrf()).contentType("application/json").content("{\"status\":\"APPROVED\",\"response\":\"Approved by warden\"}")).andExpect(status().isOk());
  assertEquals("APPROVED",db.queryForObject("select status from leave_requests where id=?",String.class,id));
 }
 @Test @WithMockUser(username="chef@hostel.local",roles="CHEF") void chefCannotAccessResidenceOrFinance() throws Exception {
  for(String path:new String[]{"/api/admin/students","/api/warden/students","/api/rooms","/api/allocations","/api/invoices","/api/leaves","/api/attendance","/api/complaints","/api/admin/staff"})mvc.perform(get(path)).andExpect(status().isForbidden());
 }
 @Test @WithMockUser(username="chef@hostel.local",roles="CHEF") void chefCanPublishAndUpdateMenu() throws Exception {
  String body="{\"date\":\""+LocalDate.now()+"\",\"breakfast\":\"Idli\",\"lunch\":\"Rice and dal\",\"dinner\":\"Chapati\"}";
  mvc.perform(put("/api/kitchen/menu").with(csrf()).contentType("application/json").content(body)).andExpect(status().isOk());
  mvc.perform(put("/api/kitchen/menu").with(csrf()).contentType("application/json").content(body.replace("Idli","Dosa"))).andExpect(status().isOk());
  assertEquals(1,db.queryForObject("select count(*) from mess_menu where menu_date=?",Integer.class,LocalDate.now()));
  mvc.perform(get("/api/mess/menu")).andExpect(status().isOk()).andExpect(jsonPath("$[0].breakfast").value("Dosa"));
 }
 @Test @WithMockUser(username="student@hostel.local",roles="STUDENT") void studentCannotPublishMenuOrReadKitchenCounts() throws Exception {
  mvc.perform(put("/api/kitchen/menu").with(csrf()).contentType("application/json").content("{}")).andExpect(status().isForbidden());
  mvc.perform(get("/api/kitchen/counts")).andExpect(status().isForbidden());
 }
 @Test @WithMockUser(username="chef@hostel.local",roles="CHEF") void mealCountsRespectApprovedLeaveAndOptOuts() throws Exception {
  mvc.perform(get("/api/kitchen/counts")).andExpect(status().isOk()).andExpect(jsonPath("$.breakfast").value(6));
  db.update("insert into meal_preferences(student_id,meal_date,breakfast,lunch,dinner) values(?,?,false,true,true)",student(),LocalDate.now());
  mvc.perform(get("/api/kitchen/counts")).andExpect(status().isOk()).andExpect(jsonPath("$.breakfast").value(5)).andExpect(jsonPath("$.lunch").value(6));
  db.update("insert into leave_requests(student_id,from_date,to_date,reason,status) values(?,?,?,?,?)",student(),LocalDate.now(),LocalDate.now(),"Away","APPROVED");
  mvc.perform(get("/api/kitchen/counts")).andExpect(status().isOk()).andExpect(jsonPath("$.breakfast").value(5)).andExpect(jsonPath("$.lunch").value(5)).andExpect(jsonPath("$.onLeave").value(1));
 }
 @Test @WithMockUser(username="student@hostel.local",roles="STUDENT") void mealPreferencesUpdateWithoutDuplicates() throws Exception {
  String body="{\"date\":\""+LocalDate.now()+"\",\"breakfast\":false,\"lunch\":true,\"dinner\":true}";
  for(int i=0;i<2;i++)mvc.perform(post("/api/mess/preferences").with(csrf()).contentType("application/json").content(body)).andExpect(status().isOk());
  assertEquals(1,db.queryForObject("select count(*) from meal_preferences where student_id=?",Integer.class,student()));
 }
 @Test @WithMockUser(username="student@hostel.local",roles="STUDENT") void studentSeesOnlyOwnFoodFeedback() throws Exception {
  long other=db.queryForObject("select id from users where email='student1@hostel.local'",Long.class);
  db.update("insert into food_feedback(student_id,meal_date,meal_type,rating,comments) values(?,?,?,?,?)",other,LocalDate.now(),"LUNCH",4,"Other student's feedback");
  String body="{\"date\":\""+LocalDate.now()+"\",\"mealType\":\"LUNCH\",\"rating\":5,\"comments\":\"Good meal\"}";
  mvc.perform(post("/api/mess/feedback").with(csrf()).contentType("application/json").content(body)).andExpect(status().isOk());
  mvc.perform(get("/api/mess/feedback")).andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(1)).andExpect(jsonPath("$[0].comments").value("Good meal"));
 }
 @Test @WithMockUser(username="chef@hostel.local",roles="CHEF") void chefCanRespondToFoodFeedbackWithoutResidentIdentifiers() throws Exception {
  db.update("insert into food_feedback(student_id,meal_date,meal_type,rating,comments) values(?,?,?,?,?)",student(),LocalDate.now(),"DINNER",3,"Less spicy please");
  long id=db.queryForObject("select max(id) from food_feedback",Long.class);
  mvc.perform(patch("/api/kitchen/feedback/"+id).with(csrf()).contentType("application/json").content("{\"status\":\"RESOLVED\",\"response\":\"We will reduce the spice\"}")).andExpect(status().isOk());
  mvc.perform(get("/api/mess/feedback")).andExpect(status().isOk()).andExpect(jsonPath("$[0].student_id").doesNotExist()).andExpect(jsonPath("$[0].status").value("RESOLVED"));
 }
 @Test @WithMockUser(username="admin@hostel.local",roles="ADMIN") void adminCanCreateOnlySupportedStaffRoles() throws Exception {
  String body="{\"name\":\"New Warden\",\"email\":\"newwarden@example.com\",\"rollNo\":\"W002\",\"phone\":\"9876543210\",\"department\":\"Hostel Office\",\"password\":\"Private@12345\",\"role\":\"WARDEN\"}";
  mvc.perform(post("/api/admin/staff").with(csrf()).contentType("application/json").content(body)).andExpect(status().isOk());
  mvc.perform(post("/api/admin/staff").with(csrf()).contentType("application/json").content(body.replace("WARDEN","ADMIN"))).andExpect(status().isBadRequest());
  assertEquals("WARDEN",db.queryForObject("select role from users where email='newwarden@example.com'",String.class));
 }
 @Test @WithMockUser(username="warden@hostel.local",roles="WARDEN") void wardenCannotPublishMenusOrSubmitStudentRequests() throws Exception {
  for(String path:new String[]{"/api/complaints","/api/leaves","/api/mess/preferences","/api/mess/feedback"})mvc.perform(post(path).with(csrf()).contentType("application/json").content("{}")).andExpect(status().isForbidden());
  mvc.perform(put("/api/kitchen/menu").with(csrf()).contentType("application/json").content("{}")).andExpect(status().isForbidden());
 }
 @Test void demoWardenAndChefCanSignIn() throws Exception {
  mvc.perform(post("/api/login").with(csrf()).param("username","warden@hostel.local").param("password","Warden@12345")).andExpect(status().isOk());
  mvc.perform(post("/api/login").with(csrf()).param("username","chef@hostel.local").param("password","Chef@12345")).andExpect(status().isOk());
 }
}
