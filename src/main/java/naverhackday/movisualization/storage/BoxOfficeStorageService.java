package naverhackday.movisualization.storage;

import naverhackday.movisualization.dto.BoxOfficeRecord;
import naverhackday.movisualization.dto.MovieBoxOfficeResponse;

import java.util.List;

public interface BoxOfficeStorageService {

    MovieBoxOfficeResponse getListWithMovieCd(String tmdbId);

    List<BoxOfficeRecord> getWithDateRange(String startDate, String endDate);

    List<BoxOfficeRecord> getWithDate(String date);
}
