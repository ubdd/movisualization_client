package naverhackday.movisualization.dto;

public class PersonStat {

    private double popularity;

    private int filmo_count;

    private double avg_rate;

    public double getPopularity() {
        return popularity;
    }

    public void setPopularity(double popularity) {
        this.popularity = popularity;
    }

    public int getFilmo_count() {
        return filmo_count;
    }

    public void setFilmo_count(int filmo_count) {
        this.filmo_count = filmo_count;
    }

    public double getAvg_rate() {
        return avg_rate;
    }

    public void setAvg_rate(double avg_rate) {
        this.avg_rate = avg_rate;
    }
}
