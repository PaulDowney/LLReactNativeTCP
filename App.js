/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { toUnicode } from 'punycode';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var net = require('net');
// OR, if not shimming via package.json "browser" field:
// var net = require('react-native-tcp')

var server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  c.write('你好, client! 爱你的, Server.'+ JSON.stringify(server.address()));
  c.pipe(c);
}).listen(12345,'192.168.1.83', () =>{
  console.log('已开服务:', server.address());
});

server.on('connection', (socket) => {
  socket.on('data',function (data) {
    console.log('Server收到 ' + data.toString());
  })  
});

server.on('error', (err) => {
  throw err;
});

// var client = net.createConnection(12345,'192.168.1.83');

let client = net.createConnection(12345,'192.168.1.83', () => {
  console.log('打开客户端', client.address());
  client.write('你好, server! 爱你的, Client.' + JSON.stringify(client.address()));
});

client.on('error', (error) => {
  console.log(error.message)
});

client.on('data', (data) => {
  console.log('Client收到 ' + data);
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
