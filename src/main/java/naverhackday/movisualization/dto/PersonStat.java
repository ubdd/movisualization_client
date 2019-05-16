package naverhackday.movisualization.dto;

public class PersonStat {

    private String person_name;

    private double popularity;

    private int filmo_cnt;

    private double avg_rate;

    private long search_cnt;

    public double getPopularity() {
        return popularity;
    }

    public void setPopularity(double popularity) {
        this.popularity = popularity;
    }

    public int getFilmo_cnt() {
        return filmo_cnt;
    }

    public void setFilmo_cnt(int filmo_cnt) {
        this.filmo_cnt = filmo_cnt;
    }

    public double getAvg_rate() {
        return avg_rate;
    }

    public void setAvg_rate(double avg_rate) {
        this.avg_rate = avg_rate;
    }

    public long getSearch_cnt() {
        return search_cnt;
    }

    public void setSearch_cnt(long search_cnt) {
        this.search_cnt = search_cnt;
    }

    public String getPerson_name() {
        return person_name;
    }

    public void setPerson_name(String person_name) {
        this.person_name = person_name;
    }
}
