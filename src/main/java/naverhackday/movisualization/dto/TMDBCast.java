package naverhackday.movisualization.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TMDBCast {

    @JsonProperty(value = "vote_count")
    private int voteCount;

    @JsonProperty(value = "vote_average")
    private int voteAverage;

    @JsonProperty(value = "genre_ids")
    private List<Integer> genreIds;

}
