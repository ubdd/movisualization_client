package naverhackday.movisualization.dto;

import java.util.List;

public class TopMovie {

    private String movie_name;

    private List<Integer> total_rank;

    private List<String> date;

    public String getMovie_name() {
        return movie_name;
    }

    public void setMovie_name(String movie_name) {
        this.movie_name = movie_name;
    }

    public List<Integer> getTotal_rank() {
        return total_rank;
    }

    public void setTotal_rank(List<Integer> total_rank) {
        this.total_rank = total_rank;
    }

    public List<String> getDate() {
        return date;
    }

    public void setDate(List<String> date) {
        this.date = date;
    }
}
