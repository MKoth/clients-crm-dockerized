import React, { Component, PropTypes } from "react";
import classNames from "classnames";
import { throttle } from "lodash";
import moment from "moment";
import Checkbox from "rc-checkbox";

const DEFAULT_ACTIVE_HOUR = true;
const DEFAULT_HOURS = new Array(24).fill(DEFAULT_ACTIVE_HOUR);
const DEFAULT_WEEK = new Array(7).fill(DEFAULT_HOURS);

export default class TargetTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      week: this.getInitialStateWeek(DEFAULT_WEEK),
      isMouseDown: false,
      initialStateCell: null,
      bufferChangeCell: [],
      lastWeekElement: props.week.length
    };
    this.changeStateCell = throttle(this.changeStateCell, 20);
    this.cells = [];
  }

  componentWillMount() {
    document.addEventListener("mouseup", this.handleMouseOut.bind(this), false);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      week: this.getInitialStateWeek(nextProps)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.week !== this.state.week;
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseOut.bind(this));
    this.changeStateCell.cancel();
  }

  getInitialStateWeek({ week = DEFAULT_WEEK }) {
    return this.localFormatWeek(week).map(day => ({
      hours: [...day],
      isActive: day.some(hour => hour === true)
    }));
  }

  setActiveHourDay(week, selectDay, selectHour, active) {
    return week.map((day, index) => {
      if (index === selectDay) {
        return {
          ...day,
          isActive: !active
            ? day.hours.some(
                (hour, indexHour) => hour === true && indexHour !== selectHour
              )
            : true,
          hours: day.hours.map((hour, indexHour) => {
            if (indexHour === selectHour) {
              return active;
            }
            return hour;
          })
        };
      }
      return day;
    });
  }

  getLocalDay(indexDay) {
    return moment()
      .weekday(indexDay)
      .format("dd")
      .toUpperCase();
  }

  localFormatWeek(week, origin = false) {
    const isoWeekStart = moment().isoWeekday(0);
    const localWeekStart = moment().weekday(0);
    const weekBegin = localWeekStart.day() - isoWeekStart.day();

    /* eslint-disable no-unreachable */
    switch (weekBegin) {
      case 1:
        return week;
        break;
      case 6:
        let saturday;

        if (origin) {
          saturday = week[0];
          week.splice(6, 0, saturday);
          week.shift();
          return week;
        }

        saturday = week.splice(5, 1).pop();
        week.unshift(saturday);
        return week;
        break;
      default:
        return week.reverse();
    }
  }

  handleMouseOut() {
    if (!this.state.isMouseDown) return;
    this.setState({ isMouseDown: false });
  }

  changeStateCell(selectDay, selectHour, selectCell) {
    const { initialStateCell, bufferChangeCell } = this.state;
    const cell = this.cells[selectCell];
    const containClassActive = cell.classList.contains(
      `target-time__time-cell--active`
    );

    if (initialStateCell && !containClassActive) {
      cell.classList.add(`target-time__time-cell--active`);
    } else if (initialStateCell === false && containClassActive) {
      cell.classList.remove(`target-time__time-cell--active`);
    }

    bufferChangeCell.push({ day: selectDay, hour: selectHour });

    this.setState({
      bufferChangeCell
    });
  }

  handleMouseDown(selectDay, indexHour, selectCell, hour) {
    this.changeStateCell(selectDay, indexHour, selectCell);
    this.setState({ isMouseDown: true, initialStateCell: !hour });
  }

  handleMouseEnter(selectDay, indexHour, selectCell) {
    const { isMouseDown } = this.state;

    if (!isMouseDown) return;
    this.changeStateCell(selectDay, indexHour, selectCell);
  }

  handleMouseUp() {
    const { initialStateCell, bufferChangeCell } = this.state;
    let { week } = this.state;
    bufferChangeCell.forEach(cell => {
      week = this.setActiveHourDay(week, cell.day, cell.hour, initialStateCell);
    });

    this.setState({
      isMouseDown: false,
      initialStateCell: null,
      week,
      bufferChangeCell: []
    });
    this.props.onChange(
      this.localFormatWeek(
        week.map(day => day.hours),
        true
      )
    );
  }

  changeStateHour(selectHour, isActiveHour) {
    const { week } = this.state;
    this.setState({
      week: week.map(currentDay => ({
        ...currentDay,
        hours: currentDay.hours.map((hour, indexHour) => {
          if (indexHour === selectHour) {
            return !isActiveHour;
          }
          return hour;
        })
      }))
    });
  }

  renderTimeCheckbox(text, selectHour) {
    const { week } = this.state;
    let isActiveHour, checked;

    isActiveHour = week.map(currentDay =>
      currentDay.hours.some(
        (hour, indexHour) => indexHour === selectHour && hour === true
      )
    );
    isActiveHour = isActiveHour.some(hour => hour === true);
    checked = isActiveHour ? "checked" : "";

    return (
      <label className={`target-time__hour-checkbox`}>
        <Checkbox
          checked={isActiveHour}
          onChange={() => this.changeStateHour(selectHour, isActiveHour)}
        />
        <div>{text}</div>
      </label>
    );
  }

  renderDayCheckbox(selectIndexDay) {
    const changeStateDayTime = () => {
      const { week } = this.state;

      this.setState({
        week: week.map((currentDay, indexDay) => {
          if (indexDay === selectIndexDay) {
            const active = !currentDay.isActive;
            return {
              ...currentDay,
              isActive: active,
              hours: currentDay.hours.map(() => active)
            };
          }
          return currentDay;
        })
      });
    };

    return (
      <label className="label--checkbox">
        <Checkbox
          checked={this.state.week[selectIndexDay].isActive}
          onChange={changeStateDayTime}
        />
        {this.getLocalDay(selectIndexDay)}
      </label>
    );
  }

  renderToggle() {
    return (
      <div className={`target-time__toggle`}>
        <div className={`target-time__toggle__icon--active`}>
          <span className="pe-7s-ticket" />
        </div>
        <div className={`target-time__toggle__icon--inactive`}>
          <span className="pe-7s-close" />
        </div>
      </div>
    );
  }

  renderTime(hours, selectDay, lastWeekElement = false) {
    return hours.map((hour, indexHour) => {
      const timeClass = classNames(`target-time__time-cell`, {
        [`target-time__time-cell--active`]: hour,
        [`target-time__time-cell__time-checkbox`]: lastWeekElement
      });
      const selectCell = `${selectDay} - ${indexHour}`;

      if (lastWeekElement) {
        const hourStart = moment()
          .hour(indexHour)
          .format("HH");
        const hourEnd = moment()
          .hour(indexHour)
          .add(1, "h")
          .format("HH");
        const label = `${hourStart} ${hourEnd}`;
        return (
          <td className={timeClass} key={`${indexHour}-last`}>
            {this.renderTimeCheckbox(label, indexHour)}
          </td>
        );
      }

      /* eslint no-return-assign: 0 */
      return (
        <td
          className={timeClass}
          ref={cell => (this.cells[selectCell] = cell)}
          key={indexHour}
          onMouseDown={() =>
            this.handleMouseDown(selectDay, indexHour, selectCell, hour)
          }
          onMouseUp={() => this.handleMouseUp(selectDay, indexHour, selectCell)}
          onMouseMove={() =>
            this.handleMouseEnter(selectDay, indexHour, selectCell)
          }
        >
          {this.renderToggle()}
        </td>
      );
    });
  }

  renderGrid() {
    const { week } = this.state;
    const arrayWeek = [];
    const lastIndexWeek = week.length - 1;
    const dayClass = classNames(`target-time__week-row`);

    week.forEach((day, indexDay) => {
      arrayWeek.push(
        <tr className={dayClass} key={indexDay}>
          <td className={`target-time__day-checkbox`}>
            {this.renderDayCheckbox(indexDay)}
          </td>
          {this.renderTime(day.hours, indexDay)}
        </tr>
      );

      if (lastIndexWeek === indexDay) {
        arrayWeek.push(
          <tr className={dayClass} key={`${indexDay}-last`}>
            <td className={`target-time__empty-checkbox`} />
            {this.renderTime(day.hours, indexDay, true)}
          </tr>
        );
      }
    });
    return arrayWeek;
  }

  render() {
    return (
      <table className={`target-time`}>
        <tbody>{this.renderGrid()}</tbody>
      </table>
    );
  }
}
