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
    Button
  } from 'react-native';

const width = Dimensions.get('screen').width

export default class Login extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Instalura</Text>
                <View style={styles.form}>
                    <TextInput placeholder="User" style={styles.input} onChangeText={text => this.setState({user: text})} />
                    <TextInput placeholder="Password" style={styles.input} onChangeText={text => this.setState({pass: text})} />
                    <Button title="Login" onPress={() => console.warn("Login")} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    title: {fontWeight: 'bold', fontSize: 26,},
    form: {width: width * 0.8},
    input: {height: 40, borderBottomColor: '#ddd', borderBottomWidth: 1,}
})