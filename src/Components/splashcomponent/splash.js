import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import splashs from '../../../assets/splashs.png';
import {
    StyleSheet,
    Animated,
    ImageBackground,
    View,
    Text
} from "react-native";
import wallet from '../../../assets/token1.png';

export default class splash extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0.6);
        this.animatedValue2 = new Animated.Value(0);
        this.state = {
            loginState: '',
            logOutState: ''
        };
    }

    componentDidMount() {

        AsyncStorage.getItem("Login").then((x4) => {
            if (x4) {
                this.state.loginState = x4
            }
            console.log("this.sytate.loginstate", this.state.loginState);
        });

        AsyncStorage.getItem("LogOut").then((x1) => {
            if (x1) {
                this.state.logoutState = x1
            }
            console.log("this.state.logoutstate", this.state.logOutState);
        });

        SplashScreen.hide();
        Animated.spring(this.animatedValue, {
            toValue: 1,
            friction: 4,
            delay: 2500
        }).start();
        Animated.timing(this.animatedValue2, {
            toValue: 1,
            delay: 200,
            duration: 4000
        }).start((x) => {
            if (this.state.loginState == "1") {
                Actions.replace("HomePage");
            } else {
                Actions.createwallet();
            }
        });
    }

    render() {
        const truckStyle = {
            transform: [{ scale: this.animatedValue }]
        };

        const scaleText = {
            transform: [{ scale: this.animatedValue2 }]
        };

        return (
            <View style={styles.container} >
                <ImageBackground
                    source={splashs}
                    style={{ height: '100%', width: '100%' }}>
                    <Animated.View style={[styles.ring, truckStyle]}>
                        <Animated.Image
                            source={wallet}
                            style={[
                                {
                                    width: 150,
                                    height: 150,
                                }
                            ]} />

                        <Text style={{ fontSize: 23, fontWeight: '700', color: 'white', marginTop: '5%' }}>Task Project</Text>
                    </Animated.View>
                    <Animated.View
                        style={[
                            {
                                position: "absolute",
                                bottom: 10,
                                width: '100%',
                                height: 4,
                                backgroundColor: "#fff",
                                borderRadius: 2
                            },
                            scaleText
                        ]} />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    ring: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    }
});
