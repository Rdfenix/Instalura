/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList
} from 'react-native';

import Post from '../components/Post'

export default class Feed extends Component {
  //constroi o componente
  constructor(){
    super()
    this.state = {
      photos: []
    }
    this.like = this.like.bind(this)
    this.addCommentary = this.addCommentary.bind(this)
  }
  //essa função é carregada apos o componente ser montado
  componentDidMount(){
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then(response => response.json())
    .then(json => this.setState({photos: json}))
  }


  like(photoId){
    const photo = this.state.photos.find(photo => photo.id === photoId)
    let newList = []

    if(!photo.liked){
        newList = photo.likers.concat({login: 'meuUsuario'})
    } else {
        newList = photo.likers.filter(liker => {
            return liker.login !== 'meuUsuario'
        })
    }

    const actualPhoto = {...photo, liked: !photo.liked, likers: newList}
    const photos = this.state.photos.map(photo => photo.id === actualPhoto.id ? actualPhoto : photo)
    this.setState({photos})
  }

  addCommentary(commentaryValue, idFoto){

    if(commentaryValue === '')
        return;

    const photo = this.state.photos.find(photo => photo.id === idFoto)

    const newList = [...photo.comentarios, {
        id: commentaryValue ,
        login: 'meuUsuario' ,
        texto: commentaryValue
    }]

    const renewPhoto = {...photo, comentarios: newList}
    const photos = this.state.photos.map(photo => photo.id === renewPhoto.id ? renewPhoto : photo)
    this.setState({photos});
  }

  render() {
    return (

      <FlatList style={styles.container} keyExtractor={item => String(item.id)} data={this.state.photos} renderItem={ ({item}) => 
          <Post photo={item} likeCallback={this.like} AddcommentaryCallback={this.addCommentary} />
        }
      />
    );
  }
}
const margin = Platform.OS == 'ios' ? 20 : 0
const styles = StyleSheet.create({
  container: {marginTop: margin}
})


