package naverhackday.movisualization.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("api")
public class MovieApiController {
    @GetMapping("hello")
    public String hello() {
        return "hello, world";
    }
}
