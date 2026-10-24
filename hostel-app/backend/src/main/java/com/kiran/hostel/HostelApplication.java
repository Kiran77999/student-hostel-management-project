package com.kiran.hostel;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.net.URI;
@SpringBootApplication
public class HostelApplication {
 public static void main(String[] args) {
  String databaseUrl=System.getenv("DATABASE_URL");
  if(databaseUrl!=null&&!databaseUrl.isBlank()){
   URI uri=URI.create(databaseUrl);
   if(!uri.getScheme().equals("postgres")&&!uri.getScheme().equals("postgresql"))throw new IllegalArgumentException("DATABASE_URL must be a PostgreSQL connection URI");
   String[] credentials=uri.getUserInfo().split(":",2);
   System.setProperty("DB_URL","jdbc:postgresql://"+uri.getHost()+":"+(uri.getPort()<0?5432:uri.getPort())+uri.getPath());
   System.setProperty("DB_USER",credentials[0]);System.setProperty("DB_PASSWORD",credentials[1]);
   System.setProperty("DB_SCHEMA_SUFFIX","-postgres");
  }
  SpringApplication.run(HostelApplication.class,args);
 }
}
