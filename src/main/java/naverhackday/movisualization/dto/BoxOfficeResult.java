package naverhackday.movisualization.dto;

public class BoxOfficeResult {

    private String tmdb_movie_id;

    private String movie_nm;

    private int audi_cnt;

    private int audi_acc;

    private double sales_amt;

    private int rank;

    private int total_rank;

    private int rank_inten;

    private int rank_old_and_new;

    public String getTmdb_movie_id() {
        return tmdb_movie_id;
    }

    public void setTmdb_movie_id(String tmdb_movie_id) {
        this.tmdb_movie_id = tmdb_movie_id;
    }

    public String getMovie_nm() {
        return movie_nm;
    }

    public void setMovie_nm(String movie_nm) {
        this.movie_nm = movie_nm;
    }

    public int getAudi_cnt() {
        return audi_cnt;
    }

    public void setAudi_cnt(int audi_cnt) {
        this.audi_cnt = audi_cnt;
    }

    public double getSales_amt() {
        return sales_amt;
    }

    public void setSales_amt(double sales_amt) {
        this.sales_amt = sales_amt;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getTotal_rank() {
        return total_rank;
    }

    public void setTotal_rank(int total_rank) {
        this.total_rank = total_rank;
    }

    public int getRank_inten() {
        return rank_inten;
    }

    public void setRank_inten(int rank_inten) {
        this.rank_inten = rank_inten;
    }

    public int getRank_old_and_new() {
        return rank_old_and_new;
    }

    public void setRank_old_and_new(int rank_old_and_new) {
        this.rank_old_and_new = rank_old_and_new;
    }

    public int getAudi_acc() {
        return audi_acc;
    }

    public void setAudi_acc(int audi_acc) {
        this.audi_acc = audi_acc;
    }
}
