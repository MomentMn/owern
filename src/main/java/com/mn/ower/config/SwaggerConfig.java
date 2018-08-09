package com.mn.ower.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Parameter;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
@EnableSwagger2
@ComponentScan(basePackages = { "com.taidii.staffdevelopment.controller" })
public class SwaggerConfig
{
    public ApiInfo apiInfo() {
        return new ApiInfoBuilder()
            .title("员工发展接口文档")
            .description("这是一个给app端人员调用server端接口的测试文档与平台")
            .license("")
            .licenseUrl("")
            .termsOfServiceUrl("")
            .version("1.0.0")
            .build();
    }

    @Bean
    public Docket customImplementation() {
    	
    	//添加head参数start  
        ParameterBuilder tokenPar = new ParameterBuilder();  
        List<Parameter> pars = new ArrayList<Parameter>();  
        tokenPar.name("Authorization").description("令牌").modelRef(new ModelRef("string")).parameterType("header").required(false).build();  
        pars.add(tokenPar.build());  
        //添加head参数end  
    	
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.taidii.staffdevelopment.controller"))
                .build()
                .globalOperationParameters(pars)  
                .apiInfo(apiInfo());
    }
}
