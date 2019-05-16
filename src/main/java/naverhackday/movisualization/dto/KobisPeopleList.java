package naverhackday.movisualization.dto;

import java.util.List;

public class KobisPeopleList {
    private int totCnt;
    private List<KobisPeopleResult> peopleList;
    private String source;

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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
