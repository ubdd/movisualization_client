package naverhackday.movisualization.storage;

import naverhackday.movisualization.dto.BoxOfficeRecord;
import naverhackday.movisualization.dto.MovieBoxOfficeResponse;
import naverhackday.movisualization.dto.MovieProperty;
import naverhackday.movisualization.exception.MovieNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Repository
public class BoxOfficeDao implements BoxOfficeStorageService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public MovieBoxOfficeResponse getListWithMovieCd(String tmdbId) {
        List<BoxOfficeRecord> result;
        MovieProperty movieProperty;
        String query1 = "select currentDate, rank, totalRank, audiAcc, audiCnt from boxoffice as b, movie as m where b.movieCd=m.movieCd and m.tmdbId=?";
        String query2 = "select movieNm, movieNmEn, movieNmOg, multi, nation from movie where tmdbId=?";

        try {
            result = jdbcTemplate.query(query1, new BeanPropertyRowMapper<BoxOfficeRecord>(BoxOfficeRecord.class), tmdbId);
            movieProperty = jdbcTemplate.queryForObject(query2, new BeanPropertyRowMapper<MovieProperty>(MovieProperty.class), tmdbId);
        }
        catch (EmptyResultDataAccessException e) {
            throw new MovieNotFoundException("Movie not found");
        }

        result.sort(new Comparator<BoxOfficeRecord>() {
            @Override
            public int compare(BoxOfficeRecord o1, BoxOfficeRecord o2) {
                return o1.getCurrentDate().compareTo(o2.getCurrentDate());
            }
        });
        MovieBoxOfficeResponse response = new MovieBoxOfficeResponse();

        response.setMovie_name(movieProperty.getMovieNm());
        response.setMulti(movieProperty.getMulti());
        response.setNation(movieProperty.getNation());

        response.setAudi_acc(new ArrayList<>());
        response.setAudi_cnt(new ArrayList<>());
        response.setDate(new ArrayList<>());
        response.setRank(new ArrayList<>());
        response.setTotal_rank(new ArrayList<>());

        for (BoxOfficeRecord e : result) {
            response.getAudi_acc().add(e.getAudiAcc());
            response.getAudi_cnt().add(e.getAudiCnt());
            response.getDate().add(e.getCurrentDate());
            response.getRank().add(e.getRank());
            response.getTotal_rank().add(e.getTotalRank());
        }

        return response;
    }

    @Override
    public List<BoxOfficeRecord> getWithDateRange(String startDate, String endDate) {
        List<BoxOfficeRecord> result;
        String query = "select tmdbId, salesAmt, movieNm, currentDate, audiCnt, rank, rankInten, rankOldAndNew, totalRank, b.multi, b.nation from boxoffice as b, movie as m where currentDate between ? and ? and b.movieCd = m.movieCd";

        try {
            result = jdbcTemplate.query(query, new BeanPropertyRowMapper<BoxOfficeRecord>(BoxOfficeRecord.class), startDate, endDate);
        }
        catch (EmptyResultDataAccessException e) {
            throw new MovieNotFoundException("Movie not found");
        }

        return result;
    }

    @Override
    public List<BoxOfficeRecord> getWithDate(String date) {
        return null;
    }
}
