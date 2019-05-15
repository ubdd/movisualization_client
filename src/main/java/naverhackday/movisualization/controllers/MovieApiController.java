package naverhackday.movisualization.controllers;

import naverhackday.movisualization.dto.BoxOfficeRecord;
import naverhackday.movisualization.storage.BoxOfficeDao;
import naverhackday.movisualization.storage.BoxOfficeStorageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api")
public class MovieApiController {

    private BoxOfficeStorageService boxOfficeRepository = new BoxOfficeDao();

    @GetMapping("movie/{movieCd}")
    public List<BoxOfficeRecord> showBoxoffice(@PathVariable String movieCd) {

        return boxOfficeRepository.getListWithMovieCd(movieCd);
    }

    @GetMapping("hello")
    public String hello() {
        return "Hello World";
    }
}
