import React, { Component } from "react";
import { AppHeader } from '../Common/AppHeader';
import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions, Button } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Camera from 'react-native-camera';

var width;

class Device extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			locations: "",
			isLoading: true,
			addDevice: false,
			deviceId: 1,
			locationId: 1,
			qrcode: '',
			isCamera: false
		}
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		console.log("--------------------->");
		this.props.actions.getData();
		this.props.actions.getLocations();
		this.setState({ isLoading: false });
		// this.setState({
		//     data : []
		// })
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps---------->", nextProps.data);
		console.log("componentWillReceiveProps location---------->", nextProps.locations);
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

	handleCamera = async () => {
		this.setState({ isCamera: true });
	}

	render() {
		console.log("state--------------------------->", this.state);
		width = Dimensions.get('window').width;
		if (!this.state.isLoading) {
			if (!this.state.addDevice) {
				return (
					<Container style={styles.container}>
						<AppHeader name="Devices" navigation={this.props.navigation} />
						<Content padder>
							<ScrollView contentContainerStyle={{ marginBottom: 5 }}>
								{this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
									return (
										<Content key={i}>
											<Card>
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
							<Text style={styles.titleText} > Add new Device </Text>
						</TouchableOpacity>

					</Container>
				);
			} else {
				console.log("item--------->", this.state.deviceId);
				if (!this.state.isCamera) {
					return (
						<Container style={styles.container}>
							<AppHeader back="Device" name="Add New Device" />
							<Content padder>
								<Form>
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Icon name="developer-board" style={{marginTop: 12}} size={25} color="#4486F7" />
										<Text style={styles.bodyText} > Device Name </Text>
										<Picker
											style={styles.picker}
											selectedValue={this.state.deviceId}
											mode="dropdown"
											onValueChange={(itemValue, itemIndex) => this.setState({ deviceId: itemValue })}>
											<Picker.Item label="Raspberry pi" value="1" />
											<Picker.Item label="Arduino" value="2" />
											<Picker.Item label="ESP8266" value="3" />
										</Picker>
									</View>
									<View style={{ flex: 1, flexDirection: 'row' }}>
										<Left>
										<TextInput
											placeholder="Device Key"
											style={styles.textInput}
											maxLength={25}
											keyboardType="default"
											onChangeText={(text) => this.setState({ deviceKey: text })}
											style={{width: width*0.75}}
										/>
										</Left>
										<Right>
										<Button onPress={this.handleCamera} color="#841584" title="camera" accessibilityLabel="Learn more about this purple button">
											<Icon name="developer-board" size={30} color="#4486F7" />
										</Button>
										</Right>
									</View>
									<TextInput
										placeholder="Secreate Key"
										style={styles.textInput}
										maxLength={25}
										keyboardType="default"
										onChangeText={(text) => this.setState({ secretKey: text })}
									/>
									<View style={{ flex: 1, flexDirection: 'row' }}>									
									<Text style={styles.bodyText} > Device Location Name </Text>
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
									</View>
								</Form>
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
							<Camera
								style={styles.preview}
								onBarCodeRead={(d)=> {this.setState({device_key : d.data})}}
								ref={cam => this.camera = cam}
								aspect={Camera.constants.Aspect.fill}
							>
								<Text style={{
									backgroundColor: 'white'
								}}>{this.state.qrcode}</Text>
							</Camera>
						</View>
					);
				}
			}
		} else {
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
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
	bodyText: {
		fontSize: 18,
		color: 'grey',
		marginTop: 10,
		marginLeft: 20
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
	console.log("locations------------------------------>", state);
	return {
		data: state.DeviceReducer && state.DeviceReducer.data !== undefined ? state.DeviceReducer.data : "",
		locations: state.DeviceReducer && state.DeviceReducer.locations !== undefined ? state.DeviceReducer.locations : ""
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(Device));
