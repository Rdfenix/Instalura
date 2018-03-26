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
import InputCommentary from './inputCommentary'

const width = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props){
        super(props)
        this.state = {
            photo: this.props.photo
        }

        this.loadIcon = this.loadIcon.bind(this)
        this.like = this.like.bind(this)
        this.showLikes = this.showLikes.bind(this)
        this.showCommentary = this.showCommentary.bind(this)
        this.addCommentary = this.addCommentary.bind(this)
    }

    loadIcon(liked){
        return liked ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
    }

    like(){
        const { photo } =  this.state

        let newList = []

        if(!photo.liked){
            newList = photo.likers.concat({login: 'meuUsuario'})
        } else {
            newList = photo.likers.filter(liker => {
                return liker.login !== 'meuUsuario'
            })
        }
        const actualPhoto = {...photo, liked: !photo.liked, likers: newList}
        this.setState({photo: actualPhoto})
    }

    showLikes(likers){

        if(likers.length == 0)
            return;

        return(
            <Text style={styles.likeCount}>
                {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
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
        const {photo} = this.state
        return(
            <View>
                <View style={styles.header}>
                    <Image source={{uri: photo.urlPerfil}} style={styles.perfilImage}/>
                    <Text>{photo.loginUsuario}</Text>
                </View>
                <Image source={{uri: photo.urlFoto}} style={styles.postPhoto}/>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like} style={styles.likeButton}>
                        <Image source={this.loadIcon(photo.liked)} style={styles.likeButton} />
                    </TouchableOpacity>
                    
                    {this.showLikes(photo.likers)}
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
    likeButton: {width: 40, height: 40, marginBottom: 10},
    likeCount: {fontWeight: 'bold'},
    commentary: {flexDirection: 'row'},
    titleCommentary: {fontWeight: 'bold', marginRight: 5},
})