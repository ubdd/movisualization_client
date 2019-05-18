package naverhackday.movisualization.dto.kobis;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PeopleInfo {

    @JsonUnwrapped
    private List<Filmo> filmos;

    public List<Filmo> getFilmos() {
        return filmos;
    }

    public void setFilmos(List<Filmo> filmos) {
        this.filmos = filmos;
    }
}
