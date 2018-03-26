import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
  } from 'react-native';


export default class Likes extends Component{

    constructor(props){
        super(props)
        this.loadIcon = this.loadIcon.bind(this)
        this.showLikes = this.showLikes.bind(this)
    }

    loadIcon(liked){
        return liked ? require('../../resources/img/s2-checked.png') : require('../../resources/img/s2.png')
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

    render(){
        const {photo, like} = this.props
        return(
            <View>
                <TouchableOpacity onPress={() => {like(photo.id)}} style={styles.likeButton}>
                    <Image source={this.loadIcon(photo.liked)} style={styles.likeButton} />
                </TouchableOpacity>

                {this.showLikes(photo.likers)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    likeButton: {width: 40, height: 40, marginBottom: 10},
    likeCount: {fontWeight: 'bold'},
})