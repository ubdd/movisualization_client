package naverhackday.movisualization.storage;

import naverhackday.movisualization.dto.BoxOfficeRecord;
import naverhackday.movisualization.dto.MovieBoxOfficeResponse;
import naverhackday.movisualization.dto.TopMovie;

import java.util.List;

public interface BoxOfficeStorageService {

    MovieBoxOfficeResponse getListWithMovieCd(String tmdbId);

    List<BoxOfficeRecord> getWithDateRange(String startDate, String endDate);

    List<TopMovie> getTopMovies(String startDate, String endDate);
}
