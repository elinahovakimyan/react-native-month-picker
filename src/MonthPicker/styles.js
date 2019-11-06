import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  monthStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  horizontalFlexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  yearViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});

export default styles;
