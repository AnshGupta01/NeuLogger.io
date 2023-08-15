package com.ansh.blog.blogappapis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class SwaggerConfig {
    public static final String AUTHORIZATION_HEADER="Authorization";
    private ApiKey apiKeys(){
        return new ApiKey("JWT",AUTHORIZATION_HEADER,"header");
    }

    private List<SecurityContext> securityContextList(){
        return Arrays.asList(SecurityContext.builder().securityReferences(sf()).build());
    }
    private List<SecurityReference> sf(){
        AuthorizationScope scope = new AuthorizationScope("global","accessEverything");
        return Arrays.asList(new SecurityReference("JWT", new AuthorizationScope[] {scope} ));
    }

    @Bean
    public Docket api(){

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(getInfo())
                .securityContexts(securityContextList())
                .securitySchemes(Arrays.asList(apiKeys()))
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();
    }
    private ApiInfo getInfo() {
        return new ApiInfo("Blogging Application","This Project is developed by Github:AnshGupta01",
                "1.00","Terms of Service",
                new Contact("Ansh Gupta","Not Applicable","AnshG2003@Gmail.com"),
                 "License of APIS","API License URL",
                Collections.EMPTY_LIST);
    }
}
