package naverhackday.movisualization.dto;

import java.sql.Date;

public class BoxOfficeRecord {

    private int showCnt;
    private int scrnCnt;
    private int rankOldAndNew;
    private String movieCd;
    private int audiAcc;
    private int audiCnt;
    private double salesShare;
    private int rank;
    private long salesAmt;
    private long salesAcc;
    private Date currentDate;
    private int totalRank;
    private int audiChange;
    private int salesChange;

    public int getShowCnt() {
        return showCnt;
    }

    public void setShowCnt(int showCnt) {
        this.showCnt = showCnt;
    }

    public int getScrnCnt() {
        return scrnCnt;
    }

    public void setScrnCnt(int scrnCnt) {
        this.scrnCnt = scrnCnt;
    }

    public int getRankOldAndNew() {
        return rankOldAndNew;
    }

    public void setRankOldAndNew(int rankOldAndNew) {
        this.rankOldAndNew = rankOldAndNew;
    }

    public String getMovieCd() {
        return movieCd;
    }

    public void setMovieCd(String movieCd) {
        this.movieCd = movieCd;
    }

    public int getAudiAcc() {
        return audiAcc;
    }

    public void setAudiAcc(int audiAcc) {
        this.audiAcc = audiAcc;
    }

    public int getAudiCnt() {
        return audiCnt;
    }

    public void setAudiCnt(int audiCnt) {
        this.audiCnt = audiCnt;
    }

    public double getSalesShare() {
        return salesShare;
    }

    public void setSalesShare(double salesShare) {
        this.salesShare = salesShare;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public long getSalesAmt() {
        return salesAmt;
    }

    public void setSalesAmt(long salesAmt) {
        this.salesAmt = salesAmt;
    }

    public long getSalesAcc() {
        return salesAcc;
    }

    public void setSalesAcc(long salesAcc) {
        this.salesAcc = salesAcc;
    }

    public Date getCurrentDate() {
        return currentDate;
    }

    public void setCurrentDate(Date currentDate) {
        this.currentDate = currentDate;
    }

    public int getTotalRank() {
        return totalRank;
    }

    public void setTotalRank(int totalRank) {
        this.totalRank = totalRank;
    }

    public int getAudiChange() {
        return audiChange;
    }

    public void setAudiChange(int audiChange) {
        this.audiChange = audiChange;
    }

    public int getSalesChange() {
        return salesChange;
    }

    public void setSalesChange(int salesChange) {
        this.salesChange = salesChange;
    }
}
