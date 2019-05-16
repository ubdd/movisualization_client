package naverhackday.movisualization.client;

import naverhackday.movisualization.dto.TMDBCast;
import naverhackday.movisualization.dto.TMDBMovieCredits;
import naverhackday.movisualization.dto.TMDBPersonResult;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class TMDBClient {

    private RestTemplate restTemplate = new RestTemplate();

    private String apiKey = "4473bb4e23c45395bf32ab11f3aa663f";

    private String tmdbPersonDetailUrl = "https://api.themoviedb.org/3/person";

    private String tmdbMovieCreditUrl = "https://api.themoviedb.org/3/person";

    public double getPopularity(String person_id) {
        TMDBPersonResult result = restTemplate.getForObject(tmdbPersonDetailUrl + "/" + person_id + "?api_key=" + apiKey + "&language=ko-KR&append_to_response=image%2Cvideo", TMDBPersonResult.class);
        return result.getPopularity();
    }

    public List<TMDBCast> getCasts(String person_id) {
        TMDBMovieCredits tmdbMovieCredits = restTemplate.getForObject(tmdbMovieCreditUrl + "/" + person_id + "/movie_credits?api_key=" + apiKey + "&language=ko-KR", TMDBMovieCredits.class);

        return tmdbMovieCredits.getCast();

    }

}
