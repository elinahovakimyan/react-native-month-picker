import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MonthPicker from 'react-native-month-picker';
import moment from 'moment';

function Example() {
  const [selectedDate, changeDate] = useState(null);

  return (
    <View style={styles.container}>
      <Text>
        {selectedDate
          ? `Selected date: ${moment(selectedDate).format('MM/YYYY')}`
          : 'Please select a date'}
      </Text>
      <MonthPicker
        selectedDate={selectedDate}
        onMonthChange={changeDate}
        onYearChange={newDate => console.log(newDate)}
        maxDate={moment()}
        minDate={moment('01-01-1995', 'DD-MM-YYYY')}
        currentMonthTextStyle={{ color: '#0aa9c2' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
});

export default React.memo(Example);
