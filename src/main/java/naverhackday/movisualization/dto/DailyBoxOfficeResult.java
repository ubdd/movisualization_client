package naverhackday.movisualization.dto;

import java.util.List;

public class DailyBoxOfficeResult {

    private String date;

    private List<BoxOfficeResult> box_office_result;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<BoxOfficeResult> getBox_office_result() {
        return box_office_result;
    }

    public void setBox_office_result(List<BoxOfficeResult> box_office_result) {
        this.box_office_result = box_office_result;
    }
}
