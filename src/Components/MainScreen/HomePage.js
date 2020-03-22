import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, Dimensions, StyleSheet,
    Platform, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl
} from 'react-native';;
var width_screen = Dimensions.get('screen').width;
var height_screen = Dimensions.get('screen').height;
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import { Card, Icon, Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import check from '../../../assets/check.png';
import Toast from 'react-native-simple-toast';
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idToDelete: '',
            dataSource: [],
            showAlert: false,
            dialogTitle: "Do You Really Want To Delete ?",
            AddEmployee: '',
            emp_Id: '',
            emp_Name: '',
            emp_Sal: '',
            emp_age: '',
            visible: true,
            refreshing: false,
            Alert2: false,
            Alert: false
        }
        console.disableYellowBox = true;
    }

    componentDidMount() {
        this.fetchHistory();
    }

    fetchHistory = () => {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.data,
                    visible: false,
                    refreshing: false
                })
            })
            .catch((error) => {
                console.log("error>xoxoxoxox", error);
                this.setState({ visible: false })
            });
    }

    goToLogoutSection = () => {
        AsyncStorage.setItem("LogOut", "1");
        AsyncStorage.setItem("Login", "0");
        Actions.createwallet();
    }

    handlerLongClick = (id) => {
        console.log("respective id of employees", id);
        this.setState({
            idToDelete: id,
            showAlert: true
        })
    }

    handleClose = () => {
        this.setState({
            showAlert: false
        })
    }

    handleClose2 = () => {
        this.setState({
            Alert2: false
        })
    }

    handleClose3 = () => {
        this.setState({
            Alert: false
        })
    }


    yesBtn = () => {
        console.log("idtodelete>>>>>", parseInt(this.state.idToDelete));
        var id_to_del = parseInt(this.state.idToDelete)
        fetch('http://dummy.restapiexample.com/api/v1/delete/' + id_to_del, {
            method: 'DELETE'
        }).then((response) => {
            if (response.status == 200) {
                this.setState({
                    showAlert: false,
                    Alert2: true
                })
                console.log("employessss list.>>>> with token id deleted", response);
            } else {
                this.setState({ showAlert: false, Alert2: false })
                Toast.show("Error in deleting employee,Try after some time", Toast.SHORT);
            }
        }).catch((error) => {
            this.setState({ showAlert: false, Alert2: false })
            Toast.show("Error in deleting employee,Try after some time", Toast.SHORT);
            console.log("error>xoxoxoxox", error);
        });
    }

    noBtn = () => {
        this.setState({
            showAlert: false
        })
    }


    renderItem = ({ item }) => {
        return (
            <ScrollView>
                <TouchableOpacity
                    onLongPress={() => this.handlerLongClick(item.id)} activeOpacity={0.4}>
                    <Card containerStyle={styles.card}>
                        <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Text style={{ flex: 1, fontSize: 13, fontWeight: 'bold', color: '#808080' }}>
                                {item.id}</Text>
                            <Text style={{ flex: 1, fontSize: 13, fontWeight: 'bold', color: '#808080', marginRight: '3%' }}>
                                {item.employee_name}</Text>
                            <Text style={{ flex: 1, fontSize: 13, fontWeight: 'bold', color: '#808080' }}>
                                {item.employee_salary}</Text>
                            <Text style={{ fontSize: 13, flex: 1, fontWeight: 'bold', color: "#808080" }}>
                                {item.employee_age} </Text>
                        </View>
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        )
    }


    addButton = () => {
        if (this.state.emp_Id == "" || this.state.emp_Name == "" || this.state.emp_Sal == "" || this.state.emp_age == "") {
            Toast.show("Fields can't be left empty", Toast.SHORT);
        } else if (!this.state.emp_Id) {
            Toast.show("Enter Employee Id", Toast.SHORT);
        } else if (!this.state.emp_Name) {
            Toast.show("Enter Employee Name", Toast.SHORT);
        } else if (!this.state.emp_Sal) {
            Toast.show("Enter Employee Salary", Toast.SHORT);
        } else if (!this.state.emp_age) {
            Toast.show("Enter Employee Age", Toast.SHORT);
        } else {
            this.RBSheet.close();
            axios.post('http://dummy.restapiexample.com/api/v1/create', {
                "name": this.state.emp_Name,
                "salary": this.state.emp_Sal,
                "age": this.state.emp_age,
                "id": this.state.emp_Id
            }).then(response => {
                console.log("response in adding employesss new record", response.data.status);
                if (response.data.status == "success") {
                    this.setState({ Alert: true })
                } else {
                    this.setState({ Alert: false })
                    Toast.show("Error in saving new record", Toast.SHORT);
                }
            }).catch(error => {
                this.setState({ Alert: false })
                console.log("response eerror ", error);
            });
        }
    }


    renderSend() {
        return (
            <ScrollView>
                <View>
                    <Text style={{ color: '#204060', alignSelf: 'center', fontSize: 20, marginTop: '10%' }}>
                        Add New Employee
                    </Text>
                    <View style={{ flexDirection: 'column', margin: '15%' }}>
                        <Input
                            placeholderTextColor="#204060"
                            placeholder="Enter Employee Id"
                            onChangeText={(text) => { this.setState({ emp_Id: text.trim() }) }}
                            inputStyle={{ color: '#000', fontSize: 15 }}
                            keyboardType="numeric"
                            maxLength={3}>
                        </Input>
                        <Input
                            placeholderTextColor="#204060"
                            placeholder="Enter Employee Name"
                            onChangeText={(text) => { this.setState({ emp_Name: text.trim() }) }}
                            inputStyle={{ color: '#000', fontSize: 15 }}
                            keyboardType="ascii-capable"
                        >
                        </Input>
                        <Input
                            placeholderTextColor="#204060"
                            placeholder="Enter Employee Salary"
                            onChangeText={(text) => { this.setState({ emp_Sal: text.trim() }) }}
                            inputStyle={{ color: '#000', fontSize: 15 }}
                            keyboardType="numeric"
                        >
                        </Input>
                        <Input
                            placeholderTextColor="#204060"
                            placeholder="Enter Employee Age"
                            onChangeText={(text) => { this.setState({ emp_age: text.trim() }) }}
                            inputStyle={{ color: '#000', fontSize: 15 }}
                            keyboardType="numeric"
                            maxLength={2}>
                        </Input>

                        <View style={{ marginTop: '15%', marginBottom: '5%' }}>
                            <Button
                                title="Add"
                                onPress={this.addButton}
                                titleStyle={{ color: 'white', fontWeight: '500' }}
                                buttonStyle={{ borderRadius: 5, width: 150, alignSelf: 'center', backgroundColor: '#204060' }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }


    _onRefresh = () => {
        this.setState({ refreshing: true })
        this.fetchHistory();
    }


    addbtn = () => {
        this.RBSheet.open();
    }

    OKAYBTN2 = () => {
        this.setState({
            Alert2: false
        })
        Actions.refresh({ key: Math.random() })
    }

    OKAYBTN = () => {
        this.setState({
            Alert: false
        })
        Actions.refresh({ key: Math.random() })
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }} >
                <View style={styles.header}>
                    <Text style={{ color: '#ffffff', alignSelf: 'center', fontSize: 17, marginLeft: '3%' }}>
                        Employees List
                        </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Icon
                            name='plus'
                            size={25}
                            type='font-awesome'
                            color='white'
                            underlayColor="transparent"
                            onPress={this.addbtn}
                            containerStyle={{ margin: 10 }} />

                        <TouchableOpacity onPress={this.goToLogoutSection}>
                            <Text style={{ color: 'white', fontSize: 14, fontWeight: '500', margin: 11 }}>
                                LOGOUT
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {(this.state.visible == true) ?
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='large' color='#0f15a8' animating={this.state.visible}></ActivityIndicator>
                    </View> :
                    <View>
                        <ScrollView style={styles.scrollviewstyle}
                            refreshControl={
                                < RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh} />
                            }>
                            <View>
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index}>
                                </FlatList>
                            </View>
                        </ScrollView>
                    </View>}

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    closeOnPressBack={true}
                    height={height_screen / 1.8}
                    duration={400}>
                    {this.renderSend()}
                </RBSheet>

                <View style={styles.containerss}>
                    <SCLAlert
                        show={this.state.showAlert}
                        onRequestClose={this.handleClose}
                        theme="info"
                        title="Are You Sure You Want To Delete?"
                        titleStyle={{ fontSize: 16, color: '#008000', fontWeight: '700' }}
                        headerIconComponent={<Image
                            source={check}
                            style={{ width: 80, height: 80 }}>
                        </Image>}>
                        <SCLAlertButton theme="info" onPress={this.yesBtn}>YES</SCLAlertButton>
                        <SCLAlertButton theme="default" onPress={this.noBtn}>NO</SCLAlertButton>
                    </SCLAlert>
                </View>

                <View style={styles.containerss}>
                    <SCLAlert
                        show={this.state.Alert2}
                        onRequestClose={this.handleClose2}
                        theme="info"
                        title="Record Successfully Deleted!"
                        titleStyle={{ fontSize: 20, color: '#008000', fontWeight: '700' }}
                        headerIconComponent={<Image
                            source={check}
                            style={{ width: 90, height: 90 }}>
                        </Image>}>
                        <SCLAlertButton theme="default" onPress={this.OKAYBTN2}>OKAY</SCLAlertButton>
                    </SCLAlert>
                </View>

                <View style={styles.containerss}>
                    <SCLAlert
                        show={this.state.Alert}
                        onRequestClose={this.handleClose3}
                        theme="info"
                        title="Record Successfully Added!"
                        titleStyle={{ fontSize: 20, color: '#008000', fontWeight: '700' }}
                        headerIconComponent={<Image
                            source={check}
                            style={{ width: 90, height: 90 }}>
                        </Image>}>
                        <SCLAlertButton theme="default" onPress={this.OKAYBTN}>OKAY</SCLAlertButton>
                    </SCLAlert>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f9',
        height: height_screen,
        width: width_screen
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#0f15a8',
        ...Platform.select({
            ios: {
                ...ifIphoneX({
                    marginTop: 35,
                    height: 60
                }, {
                        marginTop: 20,
                        height: 60
                    })
            },
            android: {
                height: 50,
            },
        }),
    },
    card: {
        marginBottom: 2,
        borderRadius: 20,
        backgroundColor: 'transparent',
        elevation: 0,
        borderWidth: 1,
        borderColor: 'black',
    },
    containerss: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollviewstyle: {
        marginBottom: '8%'
    }
});

