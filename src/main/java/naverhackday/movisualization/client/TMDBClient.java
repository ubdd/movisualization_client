package naverhackday.movisualization.client;

import naverhackday.movisualization.dto.TMDBPersonResult;
import org.springframework.web.client.RestTemplate;

public class TMDBClient {

    private RestTemplate restTemplate = new RestTemplate();

    private String apiKey = "473bb4e23c45395bf32ab11f3aa663f";

    private String tmdbPersonDetailUrl = "https://api.themoviedb.org/3/person";

    private String tmdbMovieCreditUrl = "https://api.themoviedb.org/3/person/3223/movie_credits";

    public double getPopularity(String person_id) {
        TMDBPersonResult result = restTemplate.getForObject(tmdbPersonDetailUrl + "/" + person_id + "?key=" + tmdbPersonDetailUrl + "&language=ko-KR&append_to_response=image%2Cvideo", TMDBPersonResult.class);
        return result.getPopularity();
    }

}
