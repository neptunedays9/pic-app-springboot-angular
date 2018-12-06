package com.pic.picapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@SpringBootApplication
public class PicAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(PicAppApplication.class, args);
	}
}
