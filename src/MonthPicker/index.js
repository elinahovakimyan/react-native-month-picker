import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text, TouchableOpacity, View } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import styles from './styles';
import 'moment/min/locales';

const DATE_FORMAT = 'DD-MM-YYYY';
const MONTH_YEAR_FORMAT = 'YYYY MM';

const getMonthListFirstDayDate = (date) => {
  const monthList = [];
  const year = date.format('YYYY');
  for (let i = 1; i < 13; i += 1) {
    monthList.push(moment(`01-${i}-${year}`, DATE_FORMAT));
  }
  return monthList;
};

class MonthPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    
    moment.updateLocale(this.props.localeLanguage, this.props.localeSettings);
    
    this.state = { initialView: this.props.initialView };
  }

  getSelectedBackgroundColor(month) {
    if (
      this.props.selectedBackgroundColor
      && moment(month).format(MONTH_YEAR_FORMAT)
      === moment(this.props.selectedDate).format(MONTH_YEAR_FORMAT)
    ) {
      return { backgroundColor: this.props.selectedBackgroundColor };
    }
    return {};
  }

  getSelectedForeGround(month) {
    if (
      this.props.selectedMonthTextStyle
      && moment(month).format(MONTH_YEAR_FORMAT)
      === moment(this.props.selectedDate).format(MONTH_YEAR_FORMAT)
    ) {
      return this.props.selectedMonthTextStyle;
    }
    if (
      moment(month).format(MONTH_YEAR_FORMAT)
      === moment(this.props.currentDate).format(MONTH_YEAR_FORMAT)
    ) {
      return this.props.currentMonthTextStyle;
    }
    return {};
  }

  getMonthActualComponent(month, isDisabled = false) {
    return (
      <View
        style={[
          isDisabled === true && { flex: 1, alignItems: 'center' },
          styles.monthStyle,
          this.getSelectedBackgroundColor(month),
        ]}
      >
        <Text
          style={[
            this.props.monthTextStyle,
            this.getSelectedForeGround(month),
            isDisabled === true && this.props.monthDisabledStyle,
          ]}
        >
          {moment(month).format(this.props.monthFormat)}
        </Text>
      </View>
    );
  }

  getMonthComponent(month) {
    if (this.isMonthEnabled(month)) {
      return (
        <TouchableOpacity
          onPress={() => this.handleMonthTaps(month)}
          style={{ flex: 1, alignItems: 'center' }}
        >
          {this.getMonthActualComponent(month)}
        </TouchableOpacity>
      );
    }
    return this.getMonthActualComponent(month, true);
  }

  isMonthEnabled = (month) => {
    const minDateYear = moment(this.props.minDate).format(MONTH_YEAR_FORMAT);
    const maxDateYear = moment(this.props.maxDate).format(MONTH_YEAR_FORMAT);
    const currentYear = moment(month).format(MONTH_YEAR_FORMAT);
    if (currentYear <= maxDateYear && currentYear >= minDateYear) {
      return true;
    }
    return false;
  }

  isYearEnabled = (isNext) => {
    const minYear = moment(this.props.minDate).format('YYYY');
    const maxYear = moment(this.props.maxDate).format('YYYY');
    const currentYear = moment(this.state.initialView).format('YYYY');
    if (
      (isNext && currentYear < maxYear)
      || (!isNext && currentYear > minYear)
    ) {
      return true;
    }
    return false;
  }

  handleMonthTaps = (month) => {
    this.props.onMonthChange(month);
  }

  handNextPrevTaps = (isNext) => {
    if (this.isYearEnabled(isNext)) {
      // eslint-disable-next-line
      const currentInitialView = this.state.initialView.clone();
      this.setState({
        initialView: currentInitialView.add(isNext ? 1 : -1, 'y'),
      });
      this.props.onYearChange(currentInitialView);
    }
  }

  renderQ = (months, qNo) => {
    const startMonth = qNo * 3;
    return (
      <View style={[styles.horizontalFlexViewStyle]}>
        {this.getMonthComponent(months[startMonth])}
        {this.getMonthComponent(months[startMonth + 1])}
        {this.getMonthComponent(months[startMonth + 2])}
      </View>
    );
  }

  renderHeader = () => {
    const selectedYear = moment(this.state.initialView).format('YYYY');
    const maxYear = moment(this.props.maxDate).format('YYYY');
    const minYear = moment(this.props.minDate).format('YYYY');

    return (
      <View
        style={[
          styles.horizontalFlexViewStyle,
          {
            borderBottomColor: this.props.seperatorColor,
            borderBottomWidth: this.props.seperatorHeight,
            alignSelf: 'center',
            height: 64,
          },
        ]}
      >
        <TouchableOpacity onPress={() => this.handNextPrevTaps(false)}>
          {this.props.prevIcon
            ? (
              this.props.prevIcon
            ) : (
              <Text style={selectedYear <= minYear && this.props.yearDisabledStyle}>
                {this.props.prevText}
              </Text>
            )}
        </TouchableOpacity>
        <View style={styles.yearViewStyle}>
          <Text style={this.props.yearTextStyle}>
            {selectedYear}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.handNextPrevTaps(true)}>
          {this.props.nextIcon
            ? (
              this.props.nextIcon
            ) : (
              <Text style={selectedYear >= maxYear && this.props.yearDisabledStyle}>
                {this.props.nextText}
              </Text>
            )}
        </TouchableOpacity>
      </View>
    );
  }

  handleSwipe = (gestureName) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handNextPrevTaps(true);
        break;
      case SWIPE_RIGHT:
        this.handNextPrevTaps(false);
        break;
      default:
        break;
    }
  }

  render() {
    const months = getMonthListFirstDayDate(
      this.state.initialView,
    );
    const {
      containerStyle,
      swipable,
      velocityThreshold,
      directionalOffsetThreshold,
      gestureIsClickThreshold,
    } = this.props;
    const SWIPE_CONFIG = {
      velocityThreshold,
      directionalOffsetThreshold,
      gestureIsClickThreshold,
    };

    return (
      <GestureRecognizer
        onSwipe={(direction) => (swipable ? this.handleSwipe(direction) : null)}
        config={SWIPE_CONFIG}
        style={[styles.container, containerStyle]}
      >
        {this.renderHeader()}
        {this.renderQ(months, 0)}
        {this.renderQ(months, 1)}
        {this.renderQ(months, 2)}
        {this.renderQ(months, 3)}
      </GestureRecognizer>
    );
  }
}

MonthPicker.defaultProps = {
  selectedDate: moment(),
  currentDate: moment(),
  maxDate: moment(),
  minDate: moment('01-01-1900', 'DD-MM-YYYY'),
  selectedBackgroundColor: '#000',
  selectedMonthTextStyle: { color: '#fff' },
  seperatorHeight: 1,
  seperatorColor: '#b6c3cb',
  nextIcon: null,
  prevIcon: null,
  nextText: 'Next',
  prevText: 'Prev',
  containerStyle: null,
  yearTextStyle: null,
  monthFormat: 'MMM',
  currentMonthTextStyle: {
    color: '#25cc9d',
  },
  monthTextStyle: { color: '#000' },
  initialView: moment(),
  onMonthChange: () => { },
  onYearChange: () => { },
  monthDisabledStyle: { color: '#00000050' },
  yearDisabledStyle: { color: '#00000050' },
  localeLanguage: 'en',
  localeSettings: {},
  swipable: false,
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
}

MonthPicker.propTypes = {
  selectedDate: PropTypes.any,
  currentDate: PropTypes.any,
  maxDate: PropTypes.any,
  minDate: PropTypes.any,
  selectedBackgroundColor: PropTypes.string,
  selectedMonthStyle: PropTypes.any,
  seperatorColor: PropTypes.string,
  seperatorHeight: PropTypes.number,
  nextIcon: PropTypes.any,
  prevIcon: PropTypes.any,
  nextText: PropTypes.string,
  prevText: PropTypes.string,
  containerStyle: PropTypes.any,
  yearTextStyle: PropTypes.any,
  monthTextStyle: PropTypes.any,
  currentMonthTextStyle: PropTypes.any,
  monthFormat: PropTypes.string,
  initialView: PropTypes.any,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  monthDisabledStyle: PropTypes.any,
  localeLanguage: PropTypes.string,
  localeSettings: PropTypes.any,
  swipable: PropTypes.bool,
  velocityThreshold: PropTypes.number,
  directionalOffsetThreshold: PropTypes.number,
  gestureIsClickThreshold: PropTypes.number,
}

export default MonthPicker;
