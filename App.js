import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Platform, Text } from 'react-native';
import MainNavigator from './src/Components/navigation/MainNavigator';
import { Actions } from 'react-native-router-flux';
import {
  setCustomText,
} from 'react-native-global-props';


const customTextProps = {
  style: {
    // ...Platform.select({
    //   ios: {
    //     fontFamily: "MavenProRegular"
    //   },
    //   android: {
        // fontFamily: "MavenPro-Regular"
    //   },
    // }),
  }
};

export default class App extends Component {


  componentDidMount() {
    console.reportErrorsAsExceptions = false;
    // setCustomText(customTextProps);
  }


  render() {
    return (
      <View style={{ height: '100%', width: '100%' }}>
        <StatusBar backgroundColor="#0f15a8">
        </StatusBar>
        <MainNavigator />
      </View >
    );
  }
}

