package naverhackday.movisualization.dto;

import java.util.List;

public class MovieBoxOfficeResponse {

    private String movie_name;

    private List<String> date;

    private List<Integer> rank;

    private List<Integer> total_rank;

    private List<Integer> audi_cnt;

    private List<Integer> audi_acc;

    private String multi;

    private String nation;

    public List<String> getDate() {
        return date;
    }

    public void setDate(List<String> date) {
        this.date = date;
    }

    public List<Integer> getRank() {
        return rank;
    }

    public void setRank(List<Integer> rank) {
        this.rank = rank;
    }

    public List<Integer> getTotal_rank() {
        return total_rank;
    }

    public void setTotal_rank(List<Integer> total_rank) {
        this.total_rank = total_rank;
    }

    public List<Integer> getAudi_cnt() {
        return audi_cnt;
    }

    public void setAudi_cnt(List<Integer> audi_cnt) {
        this.audi_cnt = audi_cnt;
    }

    public List<Integer> getAudi_acc() {
        return audi_acc;
    }

    public void setAudi_acc(List<Integer> audi_acc) {
        this.audi_acc = audi_acc;
    }

    public String getMulti() {
        return multi;
    }

    public void setMulti(String multi) {
        this.multi = multi;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getMovie_name() {
        return movie_name;
    }

    public void setMovie_name(String movie_name) {
        this.movie_name = movie_name;
    }
}
