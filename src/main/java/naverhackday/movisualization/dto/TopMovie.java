package naverhackday.movisualization.dto;

import java.util.List;

public class TopMovie {

    private String movie_nm;

    private List<Integer> rank;

    private List<String> date;

    public String getMovie_nm() {
        return movie_nm;
    }

    public void setMovie_nm(String movie_nm) {
        this.movie_nm = movie_nm;
    }

    public List<Integer> getRank() {
        return rank;
    }

    public void setRank(List<Integer> rank) {
        this.rank = rank;
    }

    public List<String> getDate() {
        return date;
    }

    public void setDate(List<String> date) {
        this.date = date;
    }
}
