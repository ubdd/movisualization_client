package naverhackday.movisualization.controllers;

import naverhackday.movisualization.exception.InvalidDateRangeException;
import naverhackday.movisualization.exception.MovieNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(value=MovieNotFoundException.class)
    @ResponseStatus(value=HttpStatus.NOT_FOUND)
    public int handleMovieNotFound(MovieNotFoundException e) {
        return 0;
    }

    @ExceptionHandler(value=InvalidDateRangeException.class)
    @ResponseStatus(value=HttpStatus.BAD_REQUEST)
    public int handleInvalidDateRange(InvalidDateRangeException e) {
        return 0;
    }
}
