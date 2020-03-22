import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    BackHandler, ScrollView, Dimensions, Platform
} from 'react-native';
var width_screen = Dimensions.get('window').width;
var height_screen = Dimensions.get('window').height;
import { Input, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import wallet from '../../../assets/ver.png';
import Toast from 'react-native-simple-toast';
import splashs from '../../../assets/splashs.png';

export default class createwallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameText: '',
            passwordText: ''
        }
        console.disableYellowBox = true;
        this.handleBackButton = this.handleBackButton.bind(this);
    };

    goToHomePage = () => {
        if (this.state.usernameText == "" || this.state.passwordText == "") {
            Toast.show("Fields can't be left empty", Toast.SHORT);
        } else if (this.state.usernameText != "admin") {
            Toast.show("UserName has to be admin", Toast.SHORT);
        } else if (this.state.passwordText != "123456") {
            Toast.show("Please Enter Password 123456", Toast.SHORT);
        } else {
            AsyncStorage.setItem("Login", "1");
            AsyncStorage.setItem("LogOut", "0");
            Actions.HomePage();
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;

    }



    handleUsername = (text) => {
        console.log("handle text", text);
        this.setState({
            usernameText: text
        })
    }

    handlePassword = (text) => {
        console.log("handle text", text);
        this.setState({
            passwordText: text
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <ImageBackground
                        source={splashs}
                        style={{ backgroundColor: '#fff', flex: 1 }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '28%' }}>
                            <Image source={wallet} style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center', marginLeft: '3%' }} />
                        </View>
                        <Text style={{ color: '#0f15a8', fontSize: 30, alignSelf: 'center' }}>
                            Login Screen
                         </Text>

                        <View style={{ marginLeft: '4%', marginRight: '4%' }}>
                            <Input
                                placeholder='Username'
                                inputContainerStyle={{ borderBottomColor: 'white' }}
                                style={{ color: 'white' }}
                                placeholderTextColor="white"
                                containerStyle={{ marginTop: '10%' }}
                                keyboardType="ascii-capable"
                                onChangeText={this.handleUsername}
                            />
                        </View>

                        <View style={{ marginLeft: '4%', marginRight: '4%' }}>
                            <Input
                                secureTextEntry={true}
                                placeholder='password'
                                inputContainerStyle={{ borderBottomColor: 'white' }}
                                style={{ color: 'white' }}
                                placeholderTextColor="white"
                                keyboardType="decimal-pad"
                                onChangeText={this.handlePassword}
                            />
                        </View>

                        <View style={styles.button1}>
                            <Button
                                onPress={this.goToHomePage}
                                title="LOGIN"
                                titleStyle={{
                                    color: 'white',
                                    ...Platform.select({
                                        ios: {
                                            fontFamily: "MavenProBold"
                                        },
                                        android: {
                                            fontFamily: "MavenPro-Bold"
                                        },
                                    }),
                                    fontSize: 14
                                }}
                                buttonStyle={{ borderWidth: 1, borderColor: '#0f15a8', borderRadius: 20, width: 300, alignSelf: 'center', backgroundColor: '#0f15a8' }} />
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        height: height_screen,
        width: width_screen
    },
    button1: {
        flex: 1,
        marginTop: '25%'
    }
});




