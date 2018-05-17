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
import { container, bodyText, button, horizontal, vertical, labelText, loding, smallPicker, fullTextInput } from '../../components/styles';

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
		if (!this.state.isLoading) {
			if (!this.state.addDevice) {
				return (
					<Container>
						<AppHeader name="Devices Details" navigation={this.props} back={true} />
						<View style={styles.horizontal}>
							<Content>
								<Card>
									<CardItem header bordered>
										<Text style={styles.labelText}>{this.state.deviceinfo.device_name}</Text>
									</CardItem>
									<CardItem >
										<Body style={styles.horizontal}>
											<Text style={styles.labelText}>Device Version :   </Text>
											<Text>{this.state.deviceinfo.device_version}</Text>
										</Body>
									</CardItem >
									<CardItem >
										<Text style={styles.labelText}> Date :   </Text>
										<Text>{this.state.deviceinfo.manufactured_date}</Text>
									</CardItem>
									<CardItem >
										<Text style={styles.labelText}> Device Key :   </Text>
										<Text >{this.state.deviceinfo.device_key}</Text>
									</CardItem>
								</Card>
								<Card style={{ backgroundColor: '#CDD1DF', marginBottom: 0 }}>
									<CardItem header style={{ backgroundColor: '#CDD1DF' }}>
										<Text style={styles.labelText}>Controllers</Text>
									</CardItem>
								</Card>
							</Content>
						</View>
						<Content padder>
							<View>
								<ScrollView>
									{this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
										return (
											<Content key={i}>
												<Card>
													<View style={styles.horizontal}>
														<CardItem>
															{d.device_controller_type_id === 1 ? <Icon name="fan" size={30} color="#4486F7" /> :
																<Icon name="lightbulb-on" size={30} color="#4486F7" />
															}
														</CardItem>
														<CardItem>
															<Text style={styles.bodyText}>{d.device_controller_name}</Text>
														</CardItem>
														<Right>
															<CardItem>
																<Switch
																	onValueChange={() => this.handleChange(d)}
																	value={d.status === 0 ? false : true}
																/>
															</CardItem>
														</Right>
													</View>
												</Card>
											</Content>
										);
									})}
								</ScrollView>
							</View>
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
					<Container >
						<AppHeader name="Add New Device" />
						<Content padder>
							<Card>
								<CardItem header bordered>
									<Text style={styles.labelText} >Add Controller Name</Text>
								</CardItem>
								<CardItem>
									<Text style={styles.labelText} >Device Controller Name</Text>
									<TextInput
										style={styles.halfTextInput}
										maxLength={10}
										value={this.state.device_controller_name}
										keyboardType="default"
										onChangeText={(text) => this.setState({ device_controller_name: text })}
									/>
								</CardItem>
								<CardItem>
									<Text style={styles.labelText} >Device Controller Type</Text>
									<Picker
										style={styles.picker}
										selectedValue={this.state.device_controller_type_id}
										mode="dropdown"
										onValueChange={(itemValue, itemIndex) => this.setState({ device_controller_type_id: itemValue })}>
										<Picker.Item label="Fan" value="1" />
										<Picker.Item label="Light" value="2" />
									</Picker>
								</CardItem>
								<CardItem>
									<Text style={styles.labelText} >Pin  </Text>
									<TextInput
										style={styles.shortTextInput}
										maxLength={10}
										value={this.state.pin}
										keyboardType="default"
										onChangeText={(text) => this.setState({ pin: text })}
									/>
								</CardItem>
								<CardItem>
									<Text style={styles.labelText} >Voltage  </Text>
									<TextInput
										style={styles.shortTextInput}
										maxLength={10}
										value={this.state.voltage}
										keyboardType="default"
										onChangeText={(text) => this.setState({ voltage: text })}
										style={{ width: 150 }}
									/>
									<Text style={styles.labelText} >watt</Text>
								</CardItem>
								<CardItem>
								</CardItem>
							</Card>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleInsertDeviceController}
						>
							<Text style={styles.titleText} > Insert Device Controller </Text>
						</TouchableOpacity>
					</Container >
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
