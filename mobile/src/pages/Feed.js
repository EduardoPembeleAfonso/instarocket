import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import io from 'socket.io-client';
import api from '../services/api';

import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => navigation.navigate('New')}
      >
        <Image source={camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get('/posts');
    this.setState({ feed: response.data });
  }

  registerToSocket = () => {
    const socket = io('https://instarocket-server.lucaslombardif.codes');

    socket.on('post', newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.storieContainer}>
          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.strorieItem}>
            <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/23706340?s=460&u=f7bf2df274fce3ecdb65e3eba5431bc6f424b8f5&v=4' }}
              style={styles.storieImage} />
          </LinearGradient>

          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.strorieItem}>
            <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/23706340?s=460&u=f7bf2df274fce3ecdb65e3eba5431bc6f424b8f5&v=4' }}
              style={styles.storieImage} />
          </LinearGradient>

          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.strorieItem}>
            <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/23706340?s=460&u=f7bf2df274fce3ecdb65e3eba5431bc6f424b8f5&v=4' }}
              style={styles.storieImage} />
          </LinearGradient>

          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            style={styles.strorieItem}>
            <Image source={{ uri: 'https://avatars2.githubusercontent.com/u/23706340?s=460&u=f7bf2df274fce3ecdb65e3eba5431bc6f424b8f5&v=4' }}
              style={styles.storieImage} />
          </LinearGradient>
        </View>

        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>

              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <Image source={more} />
              </View>

              <Image
                style={styles.feedImage}
                source={{ uri: `https://instarocket-server.lucaslombardif.codes/files/${item.image}` }}
              />

              <View style={styles.feedItemFooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item._id)}
                  >
                    <Image source={like} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => { }}>
                    <Image source={comment} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => { }}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.likes}>{item.likes} curtidas</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>

            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },
  feedItemHeader: {
    paddingHorizontal: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    color: '#000'
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },
  feedItemFooter: {
    paddingHorizontal: 17
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 18,
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000'
  },
  description: {
    lineHeight: 18,
    color: '#000'
  },
  hashtags: {
    color: '#7159c1'
  },
  storieContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  strorieItem: {
    marginTop: 8,
    marginRight: 10,
    height: 72,
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  storieImage: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 3
  }
});
