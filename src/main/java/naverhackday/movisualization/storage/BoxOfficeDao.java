package naverhackday.movisualization.storage;

import naverhackday.movisualization.dto.BoxOfficeRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class BoxOfficeDao implements BoxOfficeStorageService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<BoxOfficeRecord> getListWithMovieCd(String movieCd) {
        String query = "select from boxoffice where movieCd=?";
        List<BoxOfficeRecord> result = jdbcTemplate.queryForList(query, new Object[] { movieCd }, BoxOfficeRecord.class);
        System.out.println("result is " + result);
        return result;
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
