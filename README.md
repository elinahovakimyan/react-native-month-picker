# Welcome to `react-native-month-picker`

This is a simple and customizable react native month picker for both iOS and Android apps. **react-native-month-picker** allows to create a date picker with month and year fields only. This package is inspired and based on [react-native-month-selector](https://www.npmjs.com/package/react-native-month-selector) with some bugfixing and improvements.



# Demo

Here is how it looks! All the colors, formats and icons are customizable!
![enter image description here](https://lh3.googleusercontent.com/ClkKUKC1xplkhExEdrjtA_ISFAc4dc6KIDLBafivJj-hSxU_pD7m7suihMCqFfXG9TBvr952d49T3vGCxJgiJmD0WzuwJOnYLe-8nPtzKhgWguHThPC5d3ubmreJ1ItLI2W-K0SX6j6X2Eu-frIu0GlbbM-Q9FI4ddsMCBZCOr_h1IfFWC_Wti12JtVYb_nxM1m3Jy0jArSWvUYtiHM5eDGXxc13CcWIPclbE4KGFPGwaP-280ySsN4PHT5YinfcKmRtJJrbW2qDnKsVZcOUn9IuMim44BQNCs-bglkvXs9l3T6iBBFYxS3HEio_pBVtQ6A6tcF26-Yxo_UmzxcT8xasKjowi6ml4xwk99C636vxs45DEXVcB9iEfhzpWty4KiXYz4AiH52G6OqKyXJS3IVcS9lLeQDh14-rYehv7Wx4GbQ6y2GevxjyuBZ3CKQYUdVSsJrjAswGKt8fuKv37lD47FuoaL0ljCieJ598lVqFA8FA_UBdKRQTi9HJeTdYOCXHNzuXP9g6yLtuzWPHjegsp03eiQ7sMGxheXDJfkxPZLMBqCzuJtL3CxFQAZ6cWQeiDMCL2o-Y7AHRoXCOzIw5zVhReIJ8bqInc_qWIx-kEL2GWmoGlY-viHuu6T68bXjfX_WDPHfP50kHbo2Et7zlnztb4Hc0Uip9JaLAp2wFgpEFJets-XgHnClNHzlg6xu7rdRv8dnVPUNaUnJymida5Rx_eFSVb3dL22dOnDkeBogv=w732-h630-no)




## Examples

Simple example of the react native month picker **[here](https://github.com/elinahovakimyan/react-native-month-picker/blob/master/examples/modalPicker.js)**
If you need it as a **modal**, **[here](https://github.com/elinahovakimyan/react-native-month-picker/blob/master/examples/modalPicker.js)** is a very simple example on how you can create it. 




## Available props

Here is the list of all available props with their default values. You can change them to fit your project.

```
selectedDate:  moment(),
currentDate:  moment(),
maxDate:  moment(),
minDate:  moment('01-01-1900', 'DD-MM-YYYY'),
selectedBackgroundColor:  '#000',
selectedMonthTextStyle: { color:  '#fff' },
seperatorHeight:  1,
seperatorColor:  '#b6c3cb',
nextIcon:  null,
prevIcon:  null,
nextText:  'Next',
prevText:  'Prev',
containerStyle:  null,
yearTextStyle:  null,
monthFormat:  'MMM',
currentMonthTextStyle: { color:  '#25cc9d' },
monthTextStyle: { color:  '#000' },
initialView:  moment(),
onMonthChange: () => { },
onYearChange: () => { },
monthDisabledStyle: { color:  '#00000050' },
yearDisabledStyle: { color:  '#00000050' },
localeLanguage:  'en',
localeSettings: {},
swipable:  false,
velocityThreshold:  0.3,
directionalOffsetThreshold:  80,
gestureIsClickThreshold:  5,
```

## Contribution

Please feel free to open pull requests to make this package more useful for more people. I would love to keep it improving together!