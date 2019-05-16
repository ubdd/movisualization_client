package naverhackday.movisualization.client;

import naverhackday.movisualization.dto.naver.NaverResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class NaverClient {

    private final String NAVER_CLIENT_ID = "tJcUNsVqvd8RGFyNNIXB";
    private final String NAVER_CLIENT_SECRET = "cBiRAlyAsK";
    private final String NAVER_WEB_URL = "https://openapi.naver.com/v1/search/webkr.json";

    @Autowired
    private RestTemplateBuilder restTemplate;

    public long getSearchCnt(String keyword) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Naver-Client-Id", NAVER_CLIENT_ID);
        headers.set("X-Naver-Client-Secret", NAVER_CLIENT_SECRET);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(NAVER_WEB_URL);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.set("query", keyword);
        builder.queryParams(params);

        ResponseEntity<NaverResult> res = restTemplate.build().exchange(builder.build().toUriString(), HttpMethod.GET, entity, NaverResult.class);
        NaverResult result = res.getBody();

        return result.getTotal();
    }



}
