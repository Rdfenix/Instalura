import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    TextInput
  } from 'react-native';


export default class InputCommentary extends Component {
    constructor(props){
        super(props)
        this.state = {
            commentaryValue: ''
        }
    }
    render(){
        const {AddcommentaryCallback} = this.props
        const {commentaryValue} = this.state
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputText} underlineColorAndroid="transparent" 
                    value={this.state.commentaryValue} 
                    onChangeText={texto => this.setState({commentaryValue: texto})} 
                    placeholder="Adicione um comentário" />
                <TouchableOpacity onPress={() => {AddcommentaryCallback(commentaryValue, this.props.idFoto); this.setState({commentaryValue: ''})}}>
                    <Image style={styles.icon} source={require('../../resources/img/send.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd'},
    inputText: {height: 40, flex: 1},
    icon: {width: 30, height: 30}
})