import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
    Dimensions,
    Button,
    AsyncStorage
  } from 'react-native';
import axios from 'axios'

const width = Dimensions.get('screen').width

export default class Login extends Component {

    constructor(){
        super()
        this.state = {user: '', pass: '', mensagem: ''}
        this.login = this.login.bind(this)
    }

    login(){
        const uri = "https://instalura-api.herokuapp.com/api/public/login";
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.state.user,
                senha: this.state.pass
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        axios({
            method: 'post',
            baseURL: 'https://instalura-api.herokuapp.com/api/',
            url: 'public/login',
            headers: {
                'Content-type': 'application/json'
            },
            data: {
                login: this.state.user,
                senha: this.state.pass
            }
        })
        .then(response => {
            if(response.ok)
                return response.text()
            throw new Error("Não foi possivel fazer o login")
        })
        .then(token => {
            AsyncStorage.setItem('token', token); 
            AsyncStorage.setItem('usuario', this.state.user);
        })
        .catch(e => this.setState({mensagem: 'Não foi possivel fazer o login'}))
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput placeholder="User" style={styles.input} onChangeText={text => this.setState({user: text})} autoCapitalize="none" />
                    <TextInput placeholder="Password" style={styles.input} onChangeText={text => this.setState({pass: text})} secureTextEntry={true} />
                    <Button title="Login" onPress={this.login} />
                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    title: {fontWeight: 'bold', fontSize: 26,},
    form: {width: width * 0.8},
    input: {height: 40, borderBottomColor: '#ddd', borderBottomWidth: 1,},
    mensagem: {marginTop: 15, color: '#e74c3c',}
})