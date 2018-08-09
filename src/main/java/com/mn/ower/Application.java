package com.mn.ower;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("com.taidii.staffdevelopment")
@EnableScheduling
public class Application
{
    public static void main( String[] args )
    {
    	SpringApplication.run(Application.class, args);
    }

//    //配置跨域访问
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//      registry.addMapping("/**")
//          .allowCredentials(true)
//          .allowedHeaders("*")
//          .allowedOrigins("*")
//          .allowedMethods("*");
//
//    }

}
