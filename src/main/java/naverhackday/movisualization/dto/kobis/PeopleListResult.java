package naverhackday.movisualization.dto.kobis;

import java.util.List;

public class PeopleListResult {
    private int totCnt;
    private List<PeopleItem> peopleList;
    private String source;

    public int getTotCnt() {
        return totCnt;
    }

    public void setTotCnt(int totCnt) {
        this.totCnt = totCnt;
    }

    public List<PeopleItem> getPeopleList() {
        return peopleList;
    }

    public void setPeopleList(List<PeopleItem> peopleList) {
        this.peopleList = peopleList;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
