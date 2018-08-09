package com.mn.ower.config;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;
import org.springframework.web.servlet.config.annotation.*;

import com.mn.ower.commons.CommonInterceptor;

/**
 * @description:springMVC全局配置
 * @projectName:teacher-api
 * @className:TeacherWebMvcConfigurerAdapter.java
 * @author:衷文涛
 * @createTime:2018年3月7日 下午2:07:41
 * @version 1.0
 */
@EnableWebMvc
@Configuration
public class MyWebMvcConfigurerAdapter extends WebMvcConfigurerAdapter {
	@SuppressWarnings("unused")
	private static Set<String> exceptUrlSet = new HashSet<>();
	{
	}

	/**
	 * @description:实例化拦截器
	 * @return
	 * @author:衷文涛
	 * @createTime:2018年3月7日 下午2:06:44
	 */
	@Bean
	public CommonInterceptor commonInterceptor() {
		CommonInterceptor commonInterceptor = new CommonInterceptor();
		return commonInterceptor;
	}

	/**
	 * @description:配置拦截器
	 * @param registry
	 * @author:衷文涛
	 * @createTime:2018年3月7日 下午2:07:21
	 */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// //对来自/user/** 这个链接来的请求进行拦截
		// 多个拦截器组成一个拦截器链
		// addPathPatterns 用于添加拦截规则
		// excludePathPatterns 用户排除拦截
		// registry.addInterceptor(new MyInterceptor1()).addPathPatterns("/**");
		// registry.addInterceptor(new MyInterceptor2()).addPathPatterns("/**");
		registry.addInterceptor(commonInterceptor()).addPathPatterns("/**");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
	}

	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
		return new EmbeddedServletContainerCustomizer() {
			@Override
			public void customize(ConfigurableEmbeddedServletContainer container) {
				container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/error/404"));
				container.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error/500"));
				container.addErrorPages(new ErrorPage(java.lang.Throwable.class, "/error/500"));
			}
		};
	}

	@Bean
	public MethodValidationPostProcessor methodValidationPostProcessor() {
		return new MethodValidationPostProcessor();
	}

	// @Bean
	// public WebMvcConfigurer corsConfigurer() {
	// return new WebMvcConfigurerAdapter() {
	// @Override
	// public void addCorsMappings(CorsRegistry registry) {
	// registry.addMapping("/**/*").allowedOrigins("http://localhost:8888");
	// }
	// };
	// }

}
