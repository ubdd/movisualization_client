package naverhackday.movisualization.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TMDBMovieCredits {

    @JsonUnwrapped
    private List<TMDBCast> cast;

    public List<TMDBCast> getCast() {
        return cast;
    }

    public void setCast(List<TMDBCast> cast) {
        this.cast = cast;
    }
}
