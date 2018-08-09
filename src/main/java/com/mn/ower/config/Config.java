package com.mn.ower.config;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mn.ower.commons.RedisTemplateHelper;
import com.mn.ower.util.TaidiiRequestUtil;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class Config {

	 // 资源DB
    @Bean(name = "staffDevelopmentDataSource")
    @ConfigurationProperties(prefix = "spring.datasource.staffdevelopment") // application.properteis中对应属性的前缀
    public DataSource dataSource2() {
        return DataSourceBuilder.create().build();
    }
	
    @Bean
    public TaidiiRequestUtil TaidiiRequestUtil() {
    	return new TaidiiRequestUtil();
    }
    
    @Bean
	public RedisTemplateHelper getRedisTemplateHelper()
	{
		return new RedisTemplateHelper();
	}

    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1
        corsConfiguration.addAllowedHeader("*"); // 2
        corsConfiguration.addAllowedMethod("*"); // 3
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildConfig()); // 4
        return new CorsFilter(source);
    }
}
