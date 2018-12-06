package com.pic.picapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularRouteHandler {

    @RequestMapping(value="{path:^faq|services|support|home}/**")
    public String forward(){
        System.out.println("PICAPP ******************** forward");
        return "forward:/index.html";
    }

    @RequestMapping(value="")
    public String handleEmpty(){
        System.out.println("PICAPP ******************** handleEmpty");
        return "forward:/index.html";
    }
      
}
