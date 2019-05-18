package naverhackday.movisualization.client;

import naverhackday.movisualization.dto.KobisPeopleList;
import naverhackday.movisualization.dto.KobisPeopleResult;
import naverhackday.movisualization.dto.PeopleListResult;
import naverhackday.movisualization.dto.kobis.Filmo;
import naverhackday.movisualization.dto.kobis.PeopleInfoResult;
import naverhackday.movisualization.dto.kobis.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@Component
public class KobisClient {

    private final String searchPeopleListURL = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json";
    private final String searchPeopleInfoUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json";

    private String apiKeys="d95e147f4ad3c914e83f8c8f01a01058";

    @Autowired
    private RestTemplateBuilder restTemplate;

    public String getPeopleCd(String peopleNm) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(searchPeopleListURL);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.set("key", apiKeys);
        try {
            params.set("peopleNm", URLEncoder.encode(peopleNm, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            params.set("peopleNm", peopleNm);
        }


        builder.queryParams(params);

        System.out.println(builder.build().toString());

        String result = restTemplate.build().getForObject(builder.build().toUriString(), String.class);

        System.out.println(result);

        if (result == null) {
            return "";
        }

        return "";
    }

    public List<String> getMovieCds(String peopleCd) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(searchPeopleInfoUrl);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.set("key", apiKeys);
        params.set("peopleCd", peopleCd);

        builder.queryParams(params);

        RestTemplate template = restTemplate.build();
        List<HttpMessageConverter<?>> converterList = new ArrayList<>();
        converterList.add(new MappingJackson2HttpMessageConverter());

        template.setMessageConverters(converterList);

        PeopleInfoResult peopleInfoResult = template.getForObject(builder.build().toUriString(), PeopleInfoResult.class);


        List<String> movieCdList = new ArrayList<>();

        System.out.println(peopleInfoResult.toString());

        for (Filmo filmo : peopleInfoResult.getPeopleInfo().getFilmos()) {
            movieCdList.add(filmo.getMovieCd());
        }

        return movieCdList;
    }

}
