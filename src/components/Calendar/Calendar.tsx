import * as React from 'react';
import { hot } from 'react-hot-loader';
import './Calendar.scss';
import DayPicker, { DayModifiers } from 'react-day-picker';
import Button from '../Button/Button';
import ArrowBackIcon from './assets/arrow_back-24px.svg';
import ArrowForvardIcon from './assets/arrow_forward-24px.svg';
import CalendarIcon from './assets/today-24px.svg';

interface IProps {
  onDaySelect: (day: number | null) => void
}

interface IState {
  selectedDay: Date | null,
  showDatepicker: boolean
}

class Calendar extends React.Component<IProps, IState> {
  state = {
    showDatepicker: false,
    selectedDay: null
  }

  static defaultProps = {
    onDaySelect: () => {}
  }

  private toggleDatepicker = e => {
    const self = e.currentTarget
    const expanded = !JSON.parse(self.getAttribute('aria-expanded'));
    self.setAttribute('aria-expanded', expanded);

    this.setState({showDatepicker: !this.state.showDatepicker});
  }

  private getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return tomorrow;
  }

  private handleDayClick = (day: Date, { selected, disabled }: DayModifiers) => {
    if (disabled) {
      return;
    }

    this.setState({
      selectedDay: selected ? undefined : day,
      showDatepicker: false
    });

    this.props.onDaySelect(new Date(day).getTime());
  }

  public render() {
    const {showDatepicker} = this.state;

    const NavBar = ({onPreviousClick, onNextClick}) => <div className="DayPicker-NavBar">
      <Button
        label="Previous month"
        onClick={() => onPreviousClick()}
        icon={<ArrowBackIcon />}
      />
      <Button
        label="Next month"
        onClick={() => onNextClick()}
        icon={<ArrowForvardIcon />}
      />
    </div>

    return (
      <div className="calendar">
        <Button 
          type="button" 
          label="Show calendar" 
          color="purple" 
          ariaExpanded={false}
          icon={<CalendarIcon />} 
          onClick={e => this.toggleDatepicker(e)} 
        />
        <div className={`calendar__datepicker calendar__datepicker_${showDatepicker ? 'visible' : 'hidden'}`}>
          <DayPicker 
            navbarElement={NavBar} 
            showOutsideDays={true}
            disabledDays={{before: this.getTomorrow()}}
            selectedDays={this.state.selectedDay}
            onDayClick={this.handleDayClick}
          />
        </div>
      </div> 
    );
  }
}

export default hot(module)(Calendar);