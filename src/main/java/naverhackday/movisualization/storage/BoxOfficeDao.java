package naverhackday.movisualization.storage;

import naverhackday.movisualization.dto.BoxOfficeRecord;
import naverhackday.movisualization.dto.MovieBoxOfficeResponse;
import naverhackday.movisualization.dto.MovieProperty;
import org.springframework.beans.factory.annotation.Autowired;
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
        String query1 = "select currentDate, rank, totalRank, audiAcc, audiCnt from boxoffice as b, movie as m where b.movieCd=m.movieCd and m.tmdbId=?";
        String query2 = "select movieNm, movieNmEn, movieNmOg, multi, nation from movie where movieCd=?";

        List<BoxOfficeRecord> result = jdbcTemplate.query(query1, new BeanPropertyRowMapper<BoxOfficeRecord>(BoxOfficeRecord.class), tmdbId);
        MovieProperty movieProperty = jdbcTemplate.queryForObject(query2, new BeanPropertyRowMapper<MovieProperty>(MovieProperty.class), tmdbId);

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
        return null;
    }

    @Override
    public List<BoxOfficeRecord> getWithDate(String date) {
        return null;
    }
}
