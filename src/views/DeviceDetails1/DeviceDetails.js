import React, { Component } from "react";
import { AppHeader } from '../../components/AppHeader';
import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions, Button, Vibration, DatePickerAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class DeviceDetails extends Component {
	constructor(props) {
		super(props);
		// console.log("props--------->", this.props.navigation.state.params);
		this.state = {
			data: "",
			addDeviceController: false,
			deviceId: 1,
			deviceKey: "",
			secretKey: "",
			isLoading: false
		}
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		console.log("--------------------->");
		this.props.actions.getDeviceController(1);
		this.setState({ isLoading: false });
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps---------->", nextProps.data);
		// if (this.props.location.state && this.props.location.state.isListing) {
		//   this.setState({
		//     isListing: this.props.location.state.isListing
		//   })
		// }
		this.setState({ isLoading: true });
		if (nextProps.data !== undefined && nextProps.data !== null) {
			this.setState({
				data: nextProps.data,
				isLoading: false
			});
		}

		this.setState({ isLoading: false });

	};

	handleAddDevice = async () => {
		this.setState({ isLoading: true });
		this.setState({ addDevice: true });
		this.setState({ isLoading: false });
	}

	handleInsertDevice = async () => {
		this.setState({ addDevice: true });
		let formData = {
			"device_location_id": this.state.locationId,
			"device_type_id": this.state.deviceId,
			"device_key": this.state.deviceKey,
			"secret_key": this.state.secretKey
		}
		console.log("formdata----------------->", formData);
		await this.props.actions.insertDevice(formData);
		this.props.navigation.navigate('Device');
		await this.props.actions.getData();
		this.setState({ addDevice: false });
	}

	render() {
		console.log("state--------------------------->", this.state);
		const { navigate } = this.props.navigation;
		width = Dimensions.get('window').width;
		if (this.state.isLoading) {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)
		} else {
			if (this.state.addDeviceController) {
				return (
					<View style={[styles.container, styles.horizontal]}>
						<ActivityIndicator size="large" color="#0000ff" />
					</View>
				)
			} else {
				return (
					<Container style={styles.container}>
						<AppHeader name="Devices Details" navigation={this.props.navigation} />
						<Content>
							{/* <Content>
								<Card style={{ backgroundColor: '#0075C7' }}>
									<CardItem header style={{ backgroundColor: '#0075C7' }}>
										<Text style={{ color: '#fff' }}>{ this.state.deviceinfo.device_name }</Text>
									</CardItem>
									<CardItem style={{ backgroundColor: '#0075C7' }}>
										<Body style={{ backgroundColor: '#0075C7' }}>
											<Text style={{ color: '#fff' }}>
												{ this.state.deviceinfo.device_version }
											</Text>
											<Text style={{ color: '#fff' }}>
												{ this.state.deviceinfo.manufactured_date }
											</Text>
										</Body>
									</CardItem>
									<CardItem footer style={{ backgroundColor: '#0075C7' }}>
										<Text style={{ color: '#fff' }}>{ this.state.deviceinfo.device_key }</Text>
									</CardItem>
								</Card>
							</Content> */}
							<Content>
								<Card style={{ backgroundColor: '#CDD1DF' }}>
									<CardItem header style={{ backgroundColor: '#CDD1DF' }}>
										<Text style={{ color: '#333' }}>Controllers</Text>
									</CardItem>
								</Card>
								<ScrollView contentContainerStyle={{ marginBottom: 5 }}>
									{this.state.data && this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
										return (
											<Content key={i}>
												<TouchableOpacity onPress={(d) => { navigate('Home', { name: d }) }}>
													<Text>{d}</Text>
													{/* <Card>
														<CardItem header>
															<Text>{d.device_name}</Text>
														</CardItem>
														<CardItem>
															<Body>
																<Text>
																	{d.device_version}
																</Text>
																<Text>
																	{d.manufactured_date}
																</Text>
															</Body>
														</CardItem>
														<CardItem footer>
															<Text>{d.device_key}</Text>
														</CardItem>
													</Card> */}
												</TouchableOpacity>
											</Content>
										);
									})}
								</ScrollView>
							</Content>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleAddDevice}
						>
							<Text style={styles.titleText} > Add new Controller </Text>
						</TouchableOpacity>

					</Container>
				);
			}
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column'
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#03618D',
		padding: 20
	},
	titleText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white'
	},
	picker: {
		marginLeft: 25,
		width: 250
	},
	textInput: {
		fontSize: 18,
		marginBottom: 7
	},
	dateInput: {
		fontSize: 18,
		marginBottom: 7,
		width: 150
	},
	bodyText: {
		fontSize: 18,
		color: 'grey',
		marginTop: 10,
		marginLeft: 10
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	camerabutton: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end'
	}
})


function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

function mapStateToProps(state) {
	console.log("state------------------->", state);
	return {
		data: state.DeviceDetailsReducer && state.DeviceDetailsReducer.data !== undefined ? state.DeviceDetailsReducer.data : ""
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(DeviceDetails));
