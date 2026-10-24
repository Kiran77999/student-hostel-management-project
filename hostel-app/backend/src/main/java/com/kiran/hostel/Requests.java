package com.kiran.hostel;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
public class Requests {
 public record Registration(@NotBlank @Size(max=100) String name,@NotBlank @Email @Size(max=160) String email,@NotBlank @Size(max=40) String rollNo,@NotBlank @Pattern(regexp="[+0-9 ()-]{7,20}") String phone,@NotBlank @Size(max=80) String department,@NotBlank @Size(min=10,max=72) String password){}
 public record Room(@NotBlank @Size(max=30) String block,@NotBlank @Size(max=20) String number,@Min(1) @Max(12) int capacity,@NotNull @DecimalMin("0.01") @DecimalMax("1000000") BigDecimal monthlyFee){}
 public record Allocation(@Positive long studentId,@Positive long roomId){}
 public record Invoice(@Positive long studentId,@NotBlank @Size(max=150) String description,@NotNull @DecimalMin("0.01") @DecimalMax("1000000") BigDecimal amount,@NotNull LocalDate dueDate){}
 public record Payment(@NotBlank @Size(max=100) String reference){}
 public record Complaint(@NotBlank @Size(max=30) String category,@NotBlank @Size(max=150) String subject,@NotBlank @Size(max=2000) String details){}
 public record Leave(@NotNull LocalDate fromDate,@NotNull LocalDate toDate,@NotBlank @Size(max=1000) String reason){}
 public record Decision(@NotBlank String status,@NotNull @Size(max=1000) String response){}
 public record Notice(@NotBlank @Size(max=150) String title,@NotBlank @Size(max=2000) String body){}
 public record Attendance(@Positive long studentId,@NotNull LocalDate date,@NotBlank String status){}
 public record Staff(@NotBlank @Size(max=100) String name,@NotBlank @Email @Size(max=160) String email,@NotBlank @Size(max=40) String rollNo,@NotBlank @Pattern(regexp="[+0-9 ()-]{7,20}") String phone,@NotBlank @Size(max=80) String department,@NotBlank @Size(min=10,max=72) String password,@NotBlank String role){}
 public record Menu(@NotNull LocalDate date,@NotBlank @Size(max=300) String breakfast,@NotBlank @Size(max=300) String lunch,@NotBlank @Size(max=300) String dinner){}
 public record Meals(@NotNull LocalDate date,@NotNull Boolean breakfast,@NotNull Boolean lunch,@NotNull Boolean dinner){}
 public record FoodFeedback(@NotNull LocalDate date,@NotBlank String mealType,@Min(1) @Max(5) int rating,@NotBlank @Size(max=1000) String comments){}
 public record Password(@NotBlank String currentPassword,@NotBlank @Size(min=10,max=72) String newPassword){}
}
