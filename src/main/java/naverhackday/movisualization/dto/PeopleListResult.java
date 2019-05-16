package naverhackday.movisualization.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PeopleListResult {
    @JsonProperty
    private int totCnt;

    @JsonUnwrapped
    private List<KobisPeopleResult> peopleList;

    public int getTotCnt() {
        return totCnt;
    }

    public void setTotCnt(int totCnt) {
        this.totCnt = totCnt;
    }

    public List<KobisPeopleResult> getPeopleList() {
        return peopleList;
    }

    public void setPeopleList(List<KobisPeopleResult> peopleList) {
        this.peopleList = peopleList;
    }
}
