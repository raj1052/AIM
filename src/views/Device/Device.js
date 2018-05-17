import React, { Component } from "react";
import { AppHeader } from '../../components/AppHeader';
import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions, Button, Vibration, DatePickerAndroid, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { container, bodyText, button, horizontal, vertical, labelText, loding, smallPicker, fullTextInput } from '../../components/styles';

class Device extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			locations: "",
			isLoading: true,
			addDevice: false,
			deviceId: 1,
			deviceKey: "",
			secretKey: "",
			locationId: 1,
			date: "",
			isCamera: false
		}
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		console.log("--------------------->");
		this.props.actions.getData();
		this.props.actions.getLocations();
		this.setState({ isLoading: false });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isLoading: true });
		if (nextProps.data !== undefined && nextProps.data !== null) {
			this.setState({
				data: nextProps.data,
				isLoading: false
			});
		}

		if (nextProps.locations !== undefined && nextProps.locations !== null) {
			this.setState({
				locations: nextProps.locations,
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
		this.setState({ isLoading: true });
		let formData = {
			"device_location_id": this.state.locationId,
			"device_type_id": this.state.deviceId,
			"device_key": this.state.deviceKey,
			"secret_key": this.state.secretKey
		}
		await this.props.actions.insertDevice(formData);
		await this.props.actions.getData();
		this.setState({ isLoading: false, addDevice: false });
	}


	handleBarcode = (d) => {
		data = JSON.parse(d.data);
		this.setState({ deviceKey: data.devicekey, secretKey: data.secretkey, isCamera: false });
		const DURATION = 1000
		Vibration.vibrate(DURATION)
	}

	handleCamera = async () => {
		this.setState({ isCamera: true });
	}

	openAndroidDatePicker = async () => {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date()
			});
			date = year.toString() + "/" + month.toString() + "/" + day.toString();
			this.setState({ date: date })
		} catch ({ code, message }) {
			console.warn('Cannot open date picker', message);
		}
	}

	handleBack  = async () => {
		this.setState({
			isLoading: false,
			addDevice: false,
			deviceId: 1,
			deviceKey: "",
			secretKey: "",
			locationId: 1,
			date: "",
			isCamera: false
		});
		await this.props.actions.getData();
	}

	render() {
		console.log("state--------------------------->", this.state);

		const { navigate } = this.props.navigation;
		if (!this.state.isLoading) {
			if (!this.state.addDevice) {
				return (
					<Container >
						<AppHeader name="Devices" navigation={this.props} back={true} />
						<Content padder>
							<View>
								<ScrollView>
									{this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
										return (
											<TouchableOpacity key={i} onPress={() => { navigate('DeviceDetails', { data: d }) }}>
												<Card>
													<View style={styles.horizontal}>
														<CardItem header bordered>
															<Icon name="developer-board" size={25} color="#4486F7" />
														</CardItem>
														<View style={styles.vertical}>
															<CardItem >
																<Body style={styles.horizontal}>
																	<Text style={styles.labelText}>Device Name :   </Text>
																	<Text>{d.device_name}</Text>
																</Body>
															</CardItem>
															<CardItem >
																<Body style={styles.horizontal}>
																	<Text style={styles.labelText}>Device Key :   </Text>
																	<Text>{d.device_key}</Text>
																</Body>
															</CardItem>
															<CardItem >
																<Body style={styles.horizontal}>
																	<Text style={styles.labelText}>Device Version :   </Text>
																	<Text>{d.device_version}</Text>
																</Body>
															</CardItem>
															<CardItem >
																<Body style={styles.horizontal}>
																	<Text style={styles.labelText}>Date :   </Text>
																	<Text>{d.manufactured_date}</Text>
																</Body>
															</CardItem>
														</View>
													</View>
												</Card>
											</TouchableOpacity>
										);
									})}
								</ScrollView>
							</View>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleAddDevice}
						>
							<Text style={styles.titleText} > Add new Device </Text>
						</TouchableOpacity>

					</Container>
				);
			} else {
				console.log("item--------->", this.state.deviceId);
				if (!this.state.isCamera) {
					return (
						<Container >
							<Header>
								<Left style={styles.horizontal}>
									<TouchableHighlight activeOpacity={5} underlayColor="#fff" onPress={() => { this.handleBack() }}>
										<View>
											<Icon name="arrow-left" size={28} color="#fff" />
										</View>
									</TouchableHighlight>
									<Text style={styles.titleText} >    Add Device</Text>
								</Left>
								<Right />
							</Header>
							<Content padder>
								<Card>
									<View style={styles.vertical}>
										<View style={styles.horizontal}>
											<CardItem >
												<Icon name="developer-board" size={25} color="#4486F7" />
											</CardItem >
											<CardItem >
												<Text style={styles.labelText} >Device Name </Text>
												<Picker
													style={styles.picker}
													selectedValue={this.state.deviceId}
													mode="dropdown"
													onValueChange={(itemValue, itemIndex) => this.setState({ deviceId: itemValue })}>
													<Picker.Item label="Raspberry pi" value="1" />
													<Picker.Item label="Arduino" value="2" />
													<Picker.Item label="ESP8266" value="3" />
												</Picker>
											</CardItem>
										</View>
										<View style={styles.horizontal}>
											<View style={styles.vertical} >
												<CardItem >
													<TextInput
														placeholder="Device Key"
														style={styles.fullTextInput}
														maxLength={70}
														value={this.state.deviceKey}
														keyboardType="default"
														onChangeText={(text) => this.setState({ deviceKey: text })}
													/>
												</CardItem >
												<CardItem >
													<TextInput
														placeholder="Secreate Key"
														style={styles.fullTextInput}
														value={this.state.secretKey}
														maxLength={70}
														keyboardType="default"
														onChangeText={(text) => this.setState({ secretKey: text })}
													/>
												</CardItem >
											</View>
											<CardItem >
												<TouchableOpacity
													onPress={this.handleCamera}
												>
													<Icon name="barcode-scan" size={30} color="#4486F7" />
												</TouchableOpacity>
											</CardItem >
										</View>

										<View style={styles.horizontal}>
											<CardItem >
												<Text style={styles.labelText} >Device Date</Text>
											</CardItem >
											<CardItem>
												<Text style={styles.bodyText} >{this.state.date === "" ? 'Device Date' : this.state.date }</Text>
											</CardItem>
											<CardItem >
												<TouchableOpacity
													onPress={this.openAndroidDatePicker}
												>
													<Icon name="calendar-range" size={30} color="#4486F7" />
												</TouchableOpacity>

											</CardItem >
										</View>
										<View style={styles.horizontal}>
											<CardItem >
												<Text style={styles.labelText} >Device Location Name</Text>
												<Picker
													style={styles.picker}
													selectedValue={this.state.deviceId}
													mode="dropdown"
													onValueChange={(value) => this.setState({ locationId: value })}>
													{
														this.state.locations.data.map((d, i) => {
															return <Picker.Item label={d.location_name} key={i} value={d.device_location_id} />
														})
													}
												</Picker>
											</CardItem >
										</View>
									</View>
								</Card>
							</Content>
							<TouchableOpacity
								style={styles.button}
								onPress={this.handleInsertDevice}
							>
								<Text style={styles.titleText} > Insert Device </Text>
							</TouchableOpacity>

						</Container>
					);
				} else {
					return (
						<View style={styles.container}>
							<RNCamera style={styles.preview} barCodeTypes={[RNCamera.Constants.BarCodeType.qr]} onBarCodeRead={(d) => { this.handleBarcode(d) }} />
						</View>
					);
				}
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

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actionCreators, dispatch)
	}
}

function mapStateToProps(state) {
	console.log("locations------------------------------>", state);
	return {
		data: state.DeviceReducer && state.DeviceReducer.data !== undefined ? state.DeviceReducer.data : "",
		locations: state.DeviceReducer && state.DeviceReducer.locations !== undefined ? state.DeviceReducer.locations : ""
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(Device));
