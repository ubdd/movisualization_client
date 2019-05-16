import React from "react";
import styled from "styled-components";
import { DatePicker, Radio } from "antd";
import moment, { Moment } from "moment";
const { RangePicker } = DatePicker;

const DateFilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
`;

const Subtitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-right: 0.5rem;
`;

const radioStyle = {
  marginRight: "0.5rem"
};

interface Props {
  changeRangePicker: (date: any, dateString: string[]) => void;
  from_dt: Moment;
  to_dt: Moment;
}

interface State {
  radio: "manual" | "whole" | "week" | "oneMonth" | "threeMonth" | "oneYear";
}

export default class DateRangeFilter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      radio: "manual"
    };
  }

  render() {
    const { radio } = this.state;
    const dateFormat = "YYYY-MM-DD";
    const displayFormat = "YYYY-MM-DD";
    const { changeRangePicker, from_dt, to_dt } = this.props;
    const today = moment(Date.now()).subtract(1, "days");
    const week_ago = moment(Date.now()).subtract(8, "days");
    const month_ago = moment(Date.now()).subtract(1, "months");
    const three_months_ago = moment(Date.now()).subtract(3, "months");
    const year_ago = moment(Date.now()).subtract(1, "years");
    const beginning = moment(Date.now()).subtract(27, "years");
    return (
      <DateFilterContainer>
        <Subtitle>기간</Subtitle>
        <Radio.Group style={radioStyle} value={radio} buttonStyle="solid">
          <Radio.Button
            onClick={() => {
              changeRangePicker([beginning, today], ["", ""]);
              this.setState({ radio: "whole" });
            }}
            value="whole"
          >
            전체
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker([week_ago, today], ["", ""]);
              this.setState({ radio: "week" });
            }}
            value="week"
          >
            일주일
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker([month_ago, today], ["", ""]);
              this.setState({ radio: "oneMonth" });
            }}
            value="oneMonth"
          >
            1개월
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker([three_months_ago, today], ["", ""]);
              this.setState({ radio: "threeMonth" });
            }}
            value="threeMonth"
          >
            3개월
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker([year_ago, today], ["", ""]);
              this.setState({ radio: "oneYear" });
            }}
            value="oneYear"
          >
            1년
          </Radio.Button>
          <Radio.Button value="manual">직접입력</Radio.Button>
        </Radio.Group>
        <RangePicker
          onChange={(date: any, dateString: string[]) => {
            changeRangePicker(date, dateString);
            this.setState({ radio: "manual" });
          }}
          value={[moment(from_dt, dateFormat), moment(to_dt, dateFormat)]}
          format={displayFormat}
        />
      </DateFilterContainer>
    );
  }
}
