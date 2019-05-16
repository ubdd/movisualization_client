package naverhackday.movisualization.dto;

import java.sql.Date;

public class BoxOfficeRecord {

    private String tmdbId;

    private String currentDate;

    private int audiCnt;

    private int audiAcc;

    private int rank;

    private int rankInten;

    private int rankOldAndNew;

    private int totalRank;

    private double salesAmt;

    private String multi;

    private String nation;

    private String movieNm;

    public String getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(String currentDate) {
        this.currentDate = currentDate;
    }

    public int getAudiCnt() {
        return audiCnt;
    }

    public void setAudiCnt(int audiCnt) {
        this.audiCnt = audiCnt;
    }

    public int getAudiAcc() {
        return audiAcc;
    }

    public void setAudiAcc(int audiAcc) {
        this.audiAcc = audiAcc;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getTotalRank() {
        return totalRank;
    }

    public void setTotalRank(int totalRank) {
        this.totalRank = totalRank;
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

    public String getTmdbId() {
        return tmdbId;
    }

    public void setTmdbId(String tmdbId) {
        this.tmdbId = tmdbId;
    }

    public int getRankInten() {
        return rankInten;
    }

    public void setRankInten(int rankInten) {
        this.rankInten = rankInten;
    }

    public int getRankOldAndNew() {
        return rankOldAndNew;
    }

    public void setRankOldAndNew(int rankOldAndNew) {
        this.rankOldAndNew = rankOldAndNew;
    }

    public String getMovieNm() {
        return movieNm;
    }

    public void setMovieNm(String movieNm) {
        this.movieNm = movieNm;
    }

    public double getSalesAmt() {
        return salesAmt;
    }

    public void setSalesAmt(double salesAmt) {
        this.salesAmt = salesAmt;
    }
}
