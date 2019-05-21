import React from "react";
import chart from "billboard.js";
import { normalize } from "../../config/_mixin";
import { ubdPersonApis } from "../../api";
import styled from "styled-components";

interface Props {
  person: any;
  id: string;
}

interface State {
  avg_rate: number;
  search_cnt: number;
  filmo_cnt: number;
  popularity: number;
}

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-family: Helvetica, "Apple SD Gothic Neo", Arial, sans-serif,
    "nanumgothic", "Dotum";
  font-size: 1rem;
  margin: 0.7rem 0;
  width: fit-content;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Highlight = styled.span`
  color: #f2c431;
  font-weight: 800;
`;

class PersonStat extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      avg_rate: 3.7,
      search_cnt: 4,
      filmo_cnt: 0,
      popularity: 0
    };
  }

  componentDidMount = () => {
    this._getFilmoInfo();
  };

  _getFilmoInfo = async () => {
    const { id } = this.props;
    const { data } = await ubdPersonApis.stat(id);
    this.setState({
      avg_rate: data.avg_rate / 2,
      filmo_cnt: data.filmo_cnt,
      popularity: data.popularity,
      search_cnt: data.search_cnt
    });
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (prevState !== this.state) {
      this._renderChart();
    }
  };

  _renderChart = () => {
    const { person } = this.props;
    chart.generate({
      bindto: "#personStat",
      data: {
        x: "x",
        columns: [
          ["x", "평균평점", "인기도", "네이버 검색량", "작품수"],
          [
            "배우 스탯",
            this.state.avg_rate.toFixed(2),
            normalize(person.popularity, 0, 40, 0, 5, 2),
            normalize(this.state.search_cnt, 0, 1000000, 0, 5, 2),
            normalize(this.state.filmo_cnt, 0, 240, 0, 5, 2)
          ]
        ],
        type: "radar",
        colors: { "배우 스탯": "#f2c431" }
      },
      legend: {
        show: false
      },
      radar: {
        size: {
          ratio: 0.75
        },
        axis: {
          max: 5
        },
        level: {
          depth: 5
        }
      },
      size: {
        width: 400,
        height: 250
      }
    });
  };

  render() {
    const avgRate =
      this.state.avg_rate >= 3.5 ? (
        <Title>
          평균평점 <Highlight>{this.state.avg_rate.toFixed(2)}</Highlight>점!
          믿고보는 배우😎
        </Title>
      ) : (
        ""
      );
    return (
      <StatContainer>
        <div id="personStat" />
        {avgRate}
      </StatContainer>
    );
  }
}

export default PersonStat;
