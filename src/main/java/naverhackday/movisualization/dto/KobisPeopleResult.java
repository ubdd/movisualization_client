package naverhackday.movisualization.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class KobisPeopleResult {

    @JsonProperty
    private String peopleCd;

    @JsonProperty
    private String peopleNm;

    @JsonProperty
    private String peopleNmEn;

    @JsonProperty
    private String filmoNames;

    public String getPeopleCd() {
        return peopleCd;
    }

    public void setPeopleCd(String peopleCd) {
        this.peopleCd = peopleCd;
    }

    public String getPeopleNm() {
        return peopleNm;
    }

    public void setPeopleNm(String peopleNm) {
        this.peopleNm = peopleNm;
    }

    public String getPeopleNmEn() {
        return peopleNmEn;
    }

    public void setPeopleNmEn(String peopleNmEn) {
        this.peopleNmEn = peopleNmEn;
    }

    public String getFilmoNames() {
        return filmoNames;
    }

    public void setFilmoNames(String filmoNames) {
        this.filmoNames = filmoNames;
    }
}
