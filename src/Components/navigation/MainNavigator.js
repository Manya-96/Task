import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { appReducer } from '../../Reducers/index';
import createwallet from '../CreateWallet/createwallet.js';
import splash from '../splashcomponent/splash';
import HomePage from '../MainScreen/HomePage';

const Scenes = Actions.create(
    <Scene key='root' >
        <Scene key="splash"
            iconName="home"
            initial={true}
            hideNavBar={true}
            component={splash}
        />
        <Scene
            key="createwallet"
            iconName="home"
            initial={false}
            hideNavBar={true}
            component={createwallet}
        />

        <Scene key="HomePage"
            hideNavBar={true}
            component={HomePage}
        />

    </Scene>
)

const ConnectReducer = connect()(Router)
const Store = createStore(appReducer)

export default class MainNavigator extends React.Component {
    render() {
        return (
            <Provider store={Store}>
                <ConnectReducer scenes={Scenes} />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});