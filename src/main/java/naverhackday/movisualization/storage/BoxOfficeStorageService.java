package naverhackday.movisualization.storage;

import naverhackday.movisualization.dto.BoxOfficeRecord;

import java.util.List;

public interface BoxOfficeStorageService {

    List<BoxOfficeRecord> getListWithMovieCd(String movieCd);

    List<BoxOfficeRecord> getWithDateRange(String startDate, String endDate);

    List<BoxOfficeRecord> getWithDate(String date);
}