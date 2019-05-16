package naverhackday.movisualization.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import naverhackday.movisualization.dto.kobis.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;


@Component
public class KobisRestClient {
    private static final String KOBIS_API_URL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json";
    private static final String KOBIS_API_KEY = "d95e147f4ad3c914e83f8c8f01a01058";
    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private RestTemplateBuilder restTemplate;

    public Result getPeopleCd(String peopleNm) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(KOBIS_API_URL);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.set("key", KOBIS_API_KEY);
        params.set("peopleNm", peopleNm);
        builder.queryParams(params);

        String result = restTemplate.build().getForObject(builder.build().toUriString(), String.class);
        return jsonToResult(result);
    }

    private Result jsonToResult(String jsonString) {
        Result result = null;
        try {
            result = objectMapper.readValue(jsonString, Result.class);
        } catch(Exception ex) {
            result = new Result();
        }
        return result;
    }

}
