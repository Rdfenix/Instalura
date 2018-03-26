import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
  } from 'react-native';


export default class Login extends Component {
    render(){
        return(
            <View>
                <TextInput placeholder="User" onChangeText={text => this.setState({user: text})} />
                <TextInput placeholder="Password" onChangeText={text => this.setState({pass: text})} />
            </View>
        )
    }
}