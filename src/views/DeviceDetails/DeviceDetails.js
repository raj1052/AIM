import React, { Component } from "react";
import { AppHeader } from '../../components/AppHeader';
import { Alert, ScrollView, StyleSheet, Switch, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions, Button, Vibration, DatePickerAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';

var width;

class DeviceDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			locations: "",
			isLoading: true,
			addDevice: false,
			device_controller_name: "",
			device_controller_type_id: 1,
			pin: "0",
			voltage: "0"
		}
	}

	componentWillMount() {
		this.setState({
			deviceinfo: this.props.navigation.state.params.data
		})
		this.setState({ isLoading: true });
		console.log("--------------------->");
		// this.props.actions.getData();
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

	handleInsertDeviceController = async () => {
		this.setState({ isLoading: true });
		let formData = {
			"device_id": this.state.deviceinfo.device_id,
			"device_controller_name": this.state.device_controller_name,
			"device_controller_type_id": this.state.device_controller_type_id,
			"pin": this.state.pin,
			"voltage": this.state.voltage
		}
		console.log("formdata----------------->", formData);
		await this.props.actions.insertDeviceController(formData);
		// this.props.navigation.navigate('DeviceDetails');
		this.props.actions.getDeviceController(1);
		this.setState({ isLoading: false, addDevice: false });
	}

	handleChange = async (data) => {
		console.log("called------------->");
		console.log("data------------->", data);
		this.setState({ isLoading: true })
		let formData = {
			"device_id": data.device_id,
			"device_key": data.device_key,
			"device_controller_id": data.device_controller_id,
			"pin": data.pin,
			"status": data.status === 0 ? true : false
		}
		await this.props.actions.changeDeviceStatus(formData);
		await this.props.actions.getDeviceController(1);
		this.setState({ isLoading: false })
	}

	render() {
		console.log("state--------------------------->", this.state);
		const { navigate } = this.props.navigation;
		width = Dimensions.get('window').width;
		if (!this.state.isLoading) {
			if (!this.state.addDevice) {
				return (
					<Container style={styles.container}>
						<AppHeader name="Devices Details" />
						<Content style={{ marginBottom: 0}}>
							<Card style={{ backgroundColor: '#0075C7' }}>
								<CardItem header style={{ backgroundColor: '#0075C7' }}>
									<Text style={{ color: '#fff' }}>{this.state.deviceinfo.device_name}</Text>
								</CardItem>
								<CardItem style={{ backgroundColor: '#0075C7' }}>
									<Body style={{ backgroundColor: '#0075C7' }}>
										<Text style={{ color: '#fff' }}>
											{this.state.deviceinfo.device_version}
										</Text>
										<Text style={{ color: '#fff' }}>
											{this.state.deviceinfo.manufactured_date}
										</Text>
									</Body>
								</CardItem>
								<CardItem footer style={{ backgroundColor: '#0075C7' }}>
									<Text style={{ color: '#fff' }}>{this.state.deviceinfo.device_key}</Text>
								</CardItem>
							</Card>

							<Card style={{ backgroundColor: '#CDD1DF', marginBottom: 0 }}>
								<CardItem header style={{ backgroundColor: '#CDD1DF' }}>
									<Text style={{ color: '#333' }}>Controllers</Text>
								</CardItem>
							</Card>
							<Card style={{ backgroundColor: '#CDD1DF', marginBottom: 0 }}>
								<CardItem header style={{ backgroundColor: '#CDD1DF' }}>
									<Text style={{ color: '#333' }}>Controllers</Text>
								</CardItem>
							</Card>
						</Content>
						<Content padder>
							<ScrollView contentContainerStyle={{ marginTop: 0, marginBottom: 5 }}>
								{this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
									return (
										<Content key={i}>
											<Card>
												<CardItem>
													<Left>
														{d.device_controller_type_id === 1 ? <Icon name="fan" size={30} color="#4486F7" /> :
															<Icon name="lightbulb-on" size={30} color="#4486F7" />
														}
														<Body>
															<View style={{ flex: 1, flexDirection: 'row' }}>
																<Text style={styles.bodyText}>{d.device_controller_name}</Text>
															</View>
															<Switch
																onValueChange={() => this.handleChange(d)}
																value={d.status === 0 ? false : true}
															/>
														</Body>
													</Left>
												</CardItem>
											</Card>
										</Content>
									);
								})}
							</ScrollView>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleAddDevice}
						>
							<Text style={styles.titleText} > Add new Controller </Text>
						</TouchableOpacity>

					</Container>
				);
			} else {
				return (
					<Container style={styles.container}>
						<AppHeader back="Device" name="Add New Device" />
						<Content padder>
							<Card>
								<CardItem>
									<Left>
										<Body>
											<View style={{ flex: 1, flexDirection: 'row' }}>
												<Text style={styles.bodyText} >Device Controller Name</Text>
												<TextInput
													style={styles.bodyText}
													maxLength={10}
													value={this.state.device_controller_name}
													keyboardType="default"
													onChangeText={(text) => this.setState({ device_controller_name: text })}
													style={{ width: 150 }}
												/>
											</View>
											<View style={{ flex: 1, flexDirection: 'row' }}>
												<Text style={styles.bodyText} >Device Controller Type</Text>
												<Picker
													style={styles.picker}
													selectedValue={this.state.device_controller_type_id}
													mode="dropdown"
													onValueChange={(itemValue, itemIndex) => this.setState({ device_controller_type_id: itemValue })}>
													<Picker.Item label="Fan" value="1" />
													<Picker.Item label="Light" value="2" />
												</Picker>
											</View>
											<View style={{ flex: 1, flexDirection: 'column' }}>
												<View style={{ flex: 1, flexDirection: 'row' }}>
													<Text style={styles.bodyText} >Pin  </Text>
													<TextInput
														style={styles.bodyText}
														maxLength={10}
														value={this.state.pin}
														keyboardType="default"
														onChangeText={(text) => this.setState({ pin: text })}
														style={{ width: 150 }}
													/>
												</View>
												<View style={{ flex: 1, flexDirection: 'row' }}>
													<Text style={styles.bodyText} >Voltage  </Text>
													<TextInput
														style={styles.bodyText}
														maxLength={10}
														value={this.state.voltage}
														keyboardType="default"
														onChangeText={(text) => this.setState({ voltage: text })}
														style={{ width: 150 }}
													/>
													<Text style={styles.bodyText} >watt</Text>
												</View>
											</View>
										</Body>
									</Left>
								</CardItem>
							</Card>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleInsertDeviceController}
						>
							<Text style={styles.titleText} > Insert Device Controller </Text>
						</TouchableOpacity>
					</Container>
				);

			}
		} else {
			return (
				<View style={[styles.container, styles.horizontal]}>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			)
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
	console.log("state------------------------------>", state);
	return {
		data: state.DeviceDetailsReducer && state.DeviceDetailsReducer.data !== undefined ? state.DeviceDetailsReducer.data : ""
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(DeviceDetails));
