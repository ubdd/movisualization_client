package naverhackday.movisualization.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TMDBPersonResult {

    @JsonProperty
    private double popularity;

    @JsonProperty(value="also_known_as")
    private List<String> alsoKnownAs;

    @JsonProperty
    private String name;

    public double getPopularity() {
        return popularity;
    }

    public void setPopularity(double popularity) {
        this.popularity = popularity;
    }

    public List<String> getAlsoKnownAs() {
        return alsoKnownAs;
    }

    public void setAlsoKnownAs(List<String> alsoKnownAs) {
        this.alsoKnownAs = alsoKnownAs;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
