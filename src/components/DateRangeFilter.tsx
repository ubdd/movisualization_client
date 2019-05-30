import React from "react";
import styled from "styled-components";
import { Radio, DatePicker } from "antd";
import moment, { Moment } from "moment";
import { media } from "../config/_mixin";
const { RangePicker } = DatePicker;

const DateFilterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 2rem;
  ${media.tablet} {
    flex-direction: column;
  }
`;

const radioStyle = {
  marginRight: "1rem"
};

interface Props {
  from_dt: Moment;
  to_dt: Moment;
  radio: "manual" | "whole" | "week" | "oneMonth" | "threeMonth" | "oneYear";
  changeRangePicker: (date: any, dateString: string[]) => void;
  onClickRadioChange: (
    radio: "manual" | "whole" | "week" | "oneMonth" | "threeMonth" | "oneYear"
  ) => void;
}

interface State {}

export default class DateRangeFilter extends React.Component<Props, State> {
  render() {
    const { from_dt, to_dt, radio } = this.props;
    const dateFormat = "YYYY-MM-DD";
    const displayFormat = "YYYY-MM-DD";

    const { changeRangePicker, onClickRadioChange } = this.props;
    return (
      <DateFilterContainer>
        <Radio.Group style={radioStyle} value={radio} buttonStyle="solid">
          <Radio.Button
            onClick={() => {
              changeRangePicker(
                [
                  moment(Date.now()).subtract(27, "years"),
                  moment(Date.now()).subtract(1, "days")
                ],
                ["", ""]
              );
              onClickRadioChange("whole");
            }}
            value="whole"
          >
            전체
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker(
                [
                  moment(Date.now()).subtract(8, "days"),
                  moment(Date.now()).subtract(1, "days")
                ],
                ["", ""]
              );
              onClickRadioChange("week");
            }}
            value="week"
          >
            일주일
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker(
                [
                  moment(Date.now()).subtract(1, "months"),
                  moment(Date.now()).subtract(1, "days")
                ],
                ["", ""]
              );
              onClickRadioChange("oneMonth");
            }}
            value="oneMonth"
          >
            1개월
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker(
                [
                  moment(Date.now()).subtract(3, "months"),
                  moment(Date.now()).subtract(1, "days")
                ],
                ["", ""]
              );
              onClickRadioChange("threeMonth");
            }}
            value="threeMonth"
          >
            3개월
          </Radio.Button>
          <Radio.Button
            onClick={() => {
              changeRangePicker(
                [
                  moment(Date.now()).subtract(1, "years"),
                  moment(Date.now()).subtract(1, "days")
                ],
                ["", ""]
              );
              onClickRadioChange("oneYear");
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
            onClickRadioChange("manual");
          }}
          value={[moment(from_dt, dateFormat), moment(to_dt, dateFormat)]}
          format={displayFormat}
        />
      </DateFilterContainer>
    );
  }
}
