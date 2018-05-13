import React, { Component } from "react";
// import { View } from "react-native";
// import { Container,Text,Content, Button } from "native-base";
import styles from "../Common/styles";
import { AppHeader } from '../Common/AppHeader'
// import { Alert } from 'react-native'

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions, Switch } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Form, Left, Title, Right } from 'native-base';

import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


// import {
// 	Container,
// 	Header,
// 	Title,
// 	Content,
// 	Button,
// 	Item,
// 	Label,
// 	Input,
// 	Body,
// 	Left,
// 	Right,
// 	Form,
// 	Text
// } from "native-base";

import { Client, Message } from 'react-native-paho-mqtt';

var testdata;
// Create a client instance
// const client = new Client({ uri: 'ws://14.140.154.146:4000/ws', clientId: '123456789', storage: setStorage });
const client = new Client({ uri: 'ws://192.168.0.3:3000/ws', clientId: '98449a6e-34cc-11e8-9234-0123456789ab', storage: setStorage });
// const client = new Client({ uri: 'ws://test.mosquitto.org/ws', clientId: '98449a6e-34cc-11e8-9234-0123456789ab', storage: setStorage });

// set event handlers
client.on('connectionLost', (responseObject) => {
	if (responseObject.errorCode !== 0) {
		console.log(responseObject.errorMessage);
	}
});

// connect the client

client.connect()
	.then(() => {
		// Once a connection has been made, make a subscription and send a message.
		console.log('onConnect');
		return client.subscribe('98449a6e-34cc-11e8-9234-0123456789ab');
	})
	.then(() => {
		const message = new Message('Hello');
		message.destinationName = '98449a6e-34cc-11e8-9234-0123456789ab';
		client.send(message);
	})
	.catch((responseObject) => {
		if (responseObject.errorCode !== 0) {
			console.log('onConnectionLost:' + responseObject.errorMessage);
		}
	});

// import * as mqtt from './node_modules/mqtt/dist/mqtt';

// var client  = connect('ws://test.mosquitto.org')

// client.subscribe("rpie")

// client.publish("rpie", "hello world!")

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "test",
			toggled: false
		}
	}

	ComponentWillMount() {
		Alert.alert("", "ComponentWillMount From Home")
	}

	ComponentDidMount() {
		Alert.alert("", "ComponentDidMount From Home")
	}

	async handleSubmit() {
		var username = await getStorage('username');
		Alert.alert("Welcome ", JSON.stringify(username));
	}

	handleChange = async(value, i) => {
		let formData = {
			"device_key": "4559d39e-35d7-11e8-9234-0123456789ab",
			"device_id": 3,
			"pin": i,
			"status": value
		}
		if(i === 0){
			this.setState({toggled1 : value})
		} else {
			this.setState({toggled2 : value})
		}
		console.log("formData------------------------>", formData);
		await this.props.actions.changeDeviceStatus(formData);
	}

	render() {

		client.on('messageReceived', (message) => {
			console.log(message.payloadString);
			this.setState({ data: message.payloadString })
		});

		console.log("state------------------->", this.state);
		return (
			<Container style={styles.container}>
				<AppHeader name="Home" navigation={this.props.navigation} />
				<Content padder>
					<Text onPress={this.handleSubmit}>{this.state.data}</Text>
					<ScrollView contentContainerStyle={{ marginBottom: 5 }}>
						<Card>
							<CardItem>
								<Left>
									<Icon name="fan" size={30} color="#4486F7" />
									<Body>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text style={styles.bodyText}>Fan:</Text>
										</View>
										<Switch
											onValueChange={(value) => this.handleChange(value, i = 1 )}
											value={this.state.toggled1}
										/>
									</Body>
								</Left>
							</CardItem>

						</Card>
						<Card>
							<CardItem>
								<Left>
									<Icon name="lightbulb-on" size={30} color="#4486F7" />
									<Body>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<Text style={styles.bodyText}>Light</Text>
										</View>
										<Switch
											onValueChange={(value) => this.handleChange(value, i = 2)}
											value={this.state.toggled2}
										/>
									</Body>
								</Left>
							</CardItem>

						</Card>
					</ScrollView>
				</Content>
			</Container>

		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

function mapStateToProps(state) {
	console.log("locations------------------------------>", state);
	return {
		data: state.HomeReducer && state.HomeReducer.data !== undefined ? state.HomeReducer.data : ""
	}
}


export default (connect(mapStateToProps, mapDispatchToProps)(Home));
