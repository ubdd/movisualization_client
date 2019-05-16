package naverhackday.movisualization.client;

import naverhackday.movisualization.dto.KobisPeopleResult;
import naverhackday.movisualization.dto.PeopleListResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.Charset;

public class KobisClient {

    private final String searchPeopleListURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json";

    private String apiKeys="d95e147f4ad3c914e83f8c8f01a01058";

    private RestTemplate restTemplate = new RestTemplate();

    public String getPeopleCd(String peopleNm) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(searchPeopleListURL);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.set("key", apiKeys);

        params.set("peopleNm", peopleNm);


        builder.queryParams(params);

        System.out.println(builder.build().toString());

        String result = restTemplate.getForObject(builder.build().toUriString(), String.class);
        return result;
    }

}
