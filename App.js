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

import Post from './src/components/Post'

export default class App extends Component {
  //constroi o componente
  constructor(){
    super()
    this.state = {
      photos: []
    }
  }
  //essa função é carregada apos o componente ser montado
  componentDidMount(){
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then(response => response.json())
    .then(json => this.setState({photos: json}))
  }

  render() {
    return (

      <FlatList style={styles.container} keyExtractor={item => String(item.id)} data={this.state.photos} renderItem={ ({item}) => 
          <Post photo={item} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {marginTop: 20}
})


