import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    TextInput
  } from 'react-native';
import InputCommentary from './InputCommentary'
import Likes from './Likes'

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props){
        super(props)

        this.showCommentary = this.showCommentary.bind(this)
        this.addCommentary = this.addCommentary.bind(this)
    }

    showCommentary(photo) {

        if(photo.comentario === '')
            return;

        return(
            <View style={styles.commentary}>
                <Text style={styles.titleCommentary}>{photo.loginUsuario}</Text>
                <Text>{photo.comentario}</Text>
            </View>
        )
    }

    addCommentary(commentaryValue){

        if(commentaryValue === '')
            return;

        const newList = [...this.state.photo.comentarios, {
            id: commentaryValue ,
            login: 'meuUsuario' ,
            texto: commentaryValue
        }]

        const renewPhoto = {...this.state.photo, comentarios: newList}
        this.setState({photo: renewPhoto});
    }

    render(){
        const {photo, likeCallback} = this.props
        return(
            <View>
                <View style={styles.header}>
                    <Image source={{uri: photo.urlPerfil}} style={styles.perfilImage}/>
                    <Text>{photo.loginUsuario}</Text>
                </View>
                <Image source={{uri: photo.urlFoto}} style={styles.postPhoto}/>
                <View style={styles.footer}>

                    <Likes photo={photo} like={likeCallback} />

                    {this.showCommentary(photo)}
                    {photo.comentarios.map(comentario =>
                        <View style={styles.commentary} key={comentario.id}>
                            <Text style={styles.titleCommentary}>{comentario.login}</Text>
                            <Text>{comentario.texto}</Text>
                        </View>
                    )}

                    <InputCommentary addCommentary={this.addCommentary} />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {margin: 10, flexDirection: 'row', alignItems: 'center'},
    perfilImage: {width: 40, height: 40, marginRight:10, borderRadius: 20},
    postPhoto: {width: width, height: width},
    footer: {margin: 10},
    commentary: {flexDirection: 'row'},
    titleCommentary: {fontWeight: 'bold', marginRight: 5},
})