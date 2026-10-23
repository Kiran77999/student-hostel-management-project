package com.kiran.hostel;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.mock.web.MockHttpSession;
import java.util.concurrent.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest(properties={"spring.datasource.url=jdbc:h2:mem:tests;MODE=MySQL;DATABASE_TO_LOWER=TRUE;DB_CLOSE_DELAY=-1"})
@AutoConfigureMockMvc @ActiveProfiles("demo")
class HostelIntegrationTest {
 @Autowired MockMvc mvc; @Autowired JdbcTemplate db; @Autowired HostelService service;
 long student(){return db.queryForObject("select id from users where email='student@hostel.local'",Long.class);}
 @Test void healthIsPublic() throws Exception {mvc.perform(get("/api/health")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("UP"));}
 @Test void anonymousCannotReadRecords() throws Exception {mvc.perform(get("/api/invoices")).andExpect(status().isUnauthorized());}
 @Test @WithMockUser(username="student@hostel.local",roles="STUDENT") void studentCannotAdminister() throws Exception {mvc.perform(get("/api/admin/students")).andExpect(status().isForbidden());}
 @Test @WithMockUser(username="student@hostel.local",roles="STUDENT") void studentSeesOnlyOwnInvoices() throws Exception {mvc.perform(get("/api/invoices")).andExpect(status().isOk()).andExpect(jsonPath("$.length()").value(1)).andExpect(jsonPath("$[0].student_id").value(student()));}
 @Test @WithMockUser(username="admin@hostel.local",roles="ADMIN") void csrfIsRequired() throws Exception {mvc.perform(post("/api/admin/rooms").contentType("application/json").content("{}" )).andExpect(status().isForbidden());}
 @Test @Transactional @WithMockUser(username="admin@hostel.local",roles="ADMIN") void roomValidationRejectsZeroCapacity() throws Exception {mvc.perform(post("/api/admin/rooms").with(csrf()).contentType("application/json").content("{\"block\":\"Z\",\"number\":\"1\",\"capacity\":0,\"monthlyFee\":100}" )).andExpect(status().isBadRequest());}
 @Test @Transactional @WithMockUser(username="admin@hostel.local",roles="ADMIN") void fullRoomCannotBeOverbooked() throws Exception {
  db.update("delete from allocations where student_id=?",student());
  db.update("update rooms set capacity=1 where id=2");
  mvc.perform(post("/api/admin/allocations").with(csrf()).contentType("application/json").content("{\"studentId\":"+student()+",\"roomId\":2}")).andExpect(status().isBadRequest());
 }
 @Test @Transactional @WithMockUser(username="admin@hostel.local",roles="ADMIN") void studentCannotReceiveTwoRooms() throws Exception {mvc.perform(post("/api/admin/allocations").with(csrf()).contentType("application/json").content("{\"studentId\":"+student()+",\"roomId\":3}")).andExpect(status().isBadRequest());}
 @Test @Transactional @WithMockUser(username="admin@hostel.local",roles="ADMIN") void paymentCannotBeRecordedTwice() throws Exception {
  long id=db.queryForObject("select id from invoices where student_id=?",Long.class,student());
  mvc.perform(post("/api/admin/invoices/"+id+"/payment").with(csrf()).contentType("application/json").content("{\"reference\":\"CASH-TEST-1\"}")).andExpect(status().isOk());
  mvc.perform(post("/api/admin/invoices/"+id+"/payment").with(csrf()).contentType("application/json").content("{\"reference\":\"CASH-TEST-2\"}")).andExpect(status().isBadRequest());
  assertEquals("CASH-TEST-1",db.queryForObject("select reference_no from invoices where id=?",String.class,id));
 }
 @Test @Transactional @WithMockUser(username="student@hostel.local",roles="STUDENT") void overlappingLeaveIsRejected() throws Exception {
  String body="{\"fromDate\":\""+java.time.LocalDate.now().plusDays(1)+"\",\"toDate\":\""+java.time.LocalDate.now().plusDays(3)+"\",\"reason\":\"Family visit\"}";
  mvc.perform(post("/api/leaves").with(csrf()).contentType("application/json").content(body)).andExpect(status().isOk());
  mvc.perform(post("/api/leaves").with(csrf()).contentType("application/json").content(body)).andExpect(status().isBadRequest());
 }
 @Test @Transactional @WithMockUser(username="student@hostel.local",roles="STUDENT") void complaintAlwaysBelongsToSignedInStudent() throws Exception {
  mvc.perform(post("/api/complaints").with(csrf()).contentType("application/json").content("{\"studentId\":999,\"category\":\"Water\",\"subject\":\"Test tap\",\"details\":\"Water not running\"}")).andExpect(status().isOk());
  assertEquals(student(),db.queryForObject("select student_id from complaints where subject='Test tap'",Long.class));
 }
 @Test @Transactional void registrationCannotCreateAdmin() throws Exception {
  mvc.perform(post("/api/register").with(csrf()).contentType("application/json").content("{\"name\":\"Test Resident\",\"email\":\"test@example.com\",\"rollNo\":\"TEST1\",\"phone\":\"9876543210\",\"department\":\"CSE\",\"password\":\"Secure@12345\",\"role\":\"ADMIN\"}")).andExpect(status().isOk());
  assertEquals("STUDENT",db.queryForObject("select role from users where email='test@example.com'",String.class));
  assertTrue(db.queryForObject("select password from users where email='test@example.com'",String.class).startsWith("$2"));
 }
 @Test void loginCreatesWorkingSessionAndLogoutInvalidatesIt() throws Exception {
  var result=mvc.perform(post("/api/login").with(csrf()).param("username","student@hostel.local").param("password","Student@12345")).andExpect(status().isOk()).andReturn();
  var session=(MockHttpSession)result.getRequest().getSession(false);
  mvc.perform(get("/api/me").session(session)).andExpect(status().isOk()).andExpect(jsonPath("$.role").value("STUDENT"));
  mvc.perform(post("/api/logout").with(csrf()).session(session)).andExpect(status().isNoContent());assertTrue(session.isInvalid());
 }
 @Test @Transactional @WithMockUser(username="admin@hostel.local",roles="ADMIN") void attendanceUpdateDoesNotDuplicateRow() throws Exception {
  String body="{\"studentId\":"+student()+",\"date\":\""+java.time.LocalDate.now()+"\",\"status\":\"ABSENT\"}";
  mvc.perform(post("/api/admin/attendance").with(csrf()).contentType("application/json").content(body)).andExpect(status().isOk());
  assertEquals(1,db.queryForObject("select count(*) from attendance where student_id=? and attendance_date=?",Integer.class,student(),java.time.LocalDate.now()));
 }
 @Test @Transactional @WithMockUser(username="admin@hostel.local",roles="ADMIN") void cannotPayMissingInvoice() throws Exception {mvc.perform(post("/api/admin/invoices/99999/payment").with(csrf()).contentType("application/json").content("{\"reference\":\"TEST\"}")).andExpect(status().isBadRequest());}
 @Test void concurrentAllocationsCannotExceedCapacity() throws Exception {
  service.register(new Requests.Registration("Concurrency A","concurrency-a@example.com","CON-A","9000000088","CSE","Student@12345"));
  service.register(new Requests.Registration("Concurrency B","concurrency-b@example.com","CON-B","9000000089","CSE","Student@12345"));
  service.room(new Requests.Room("TEST","ONE",1,new java.math.BigDecimal("100")),"admin@hostel.local");
  long room=db.queryForObject("select id from rooms where block_name='TEST'",Long.class);
  long a=service.id("concurrency-a@example.com"),b=service.id("concurrency-b@example.com");
  var executor=Executors.newFixedThreadPool(2);var start=new CountDownLatch(1);
  try{var one=executor.submit(()->attemptAllocation(a,room,start));var two=executor.submit(()->attemptAllocation(b,room,start));start.countDown();assertEquals(1,one.get(15,TimeUnit.SECONDS)+two.get(15,TimeUnit.SECONDS));assertEquals(1,db.queryForObject("select count(*) from allocations where room_id=?",Integer.class,room));}
  finally{executor.shutdownNow();db.update("delete from allocations where room_id=?",room);db.update("delete from rooms where id=?",room);db.update("delete from users where id in (?,?)",a,b);}
 }
 int attemptAllocation(long student,long room,CountDownLatch start){try{start.await();service.allocate(new Requests.Allocation(student,room),"admin@hostel.local");return 1;}catch(Exception e){return 0;}}
}
