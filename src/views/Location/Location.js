import React, { Component } from "react";
import { AppHeader } from '../../components/AppHeader';
import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { container, bodyText, button, horizontal, labelText, loding, smallPicker, halfTextInput } from '../../components/styles';

class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			isLoading: true,
			addLocation: false,
			locationName: "",
			deviceLocationTypeId: 1,
			deviceLocationId: 0
		}
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		console.log("--------------------->");
		this.props.actions.getLocations();
		this.setState({ isLoading: false });
	}

	componentWillReceiveProps(nextProps) {
		console.log("componentWillReceiveProps---------->", nextProps.data);
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
		this.setState({ addLocation: true });
	}

	handleSubmitLocation = async () => {
		this.setState({ isLoading: true });
		let formData = {
			"device_location_id": this.state.deviceLocationId,
			"device_location_type_id": this.state.deviceLocationTypeId,
			"location_name": this.state.locationName
		}
		console.log("formdata----------------->", formData);
		await this.props.actions.saveLocation(formData);
		this.setState({ isLoading: false, addLocation: false,  locationName : "", deviceLocationTypeId: 1, deviceLocationId: 0});
		await this.props.actions.getLocations();
	}

	handleEdit = async (d) => {
		console.log("data----------->", d);
		this.setState({ isLoading: true });		
		this.setState({
			locationName: d.location_name,
			deviceLocationId: d.device_location_id,
			deviceLocationTypeId: d.device_location_type_id
		})
		this.setState({ isLoading: false, addLocation: true });
	}

	handleDelete = async (d) => {
		this.setState({ isLoading: true });
		await this.props.actions.deleteLocation(d.device_location_id);
		await this.props.actions.getLocations();
		this.setState({ isLoading: false });
	}

	render() {
		console.log("state--------------------------->", this.state);
		if (!this.state.isLoading) {
			if (!this.state.addLocation) {
				return (
					<Container>
						<AppHeader name="Locations" navigation={this.props} back={true} />
						<Content padder>
							<View>
								<ScrollView>
									{this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
										return (
											<Card key={i}>
												<View style={styles.horizontal}>
													<CardItem header bordered>
														{
															d.device_location_type_id === 1 && <Icon name="home" size={30} color="#4486F7" />
														}
														{
															d.device_location_type_id === 2 && <Icon name="home-modern" size={30} color="#4486F7" />
														}
														{
															d.device_location_type_id === 3 && <Icon name="city" size={30} color="#4486F7" />
														}
													</CardItem>
													<View style={styles.vertical}>
														<CardItem bordered>
															<Body style={styles.horizontal}>
																<Text style={styles.labelText}>Location Name :   </Text>
																<Text>{d.location_name}</Text>
															</Body>
														</CardItem>
														<CardItem bordered>
															<Body style={styles.horizontal}>
																<Text style={styles.labelText}>Location Type :   </Text>
																<Text>{d.device_location_type}</Text>
															</Body>
														</CardItem>
													</View>
													<CardItem header bordered />
													<CardItem header bordered>
														<TouchableOpacity
															onPress={() => { this.handleEdit(d) }}
														>
															<Icon name="pencil" size={25} color="#03618D" />
														</TouchableOpacity>
													</CardItem>
													<CardItem header bordered>
														<TouchableOpacity
															onPress={() => { this.handleDelete(d) }}
														>
															<Icon name="delete" size={25} color="#DE0702" />
														</TouchableOpacity>
													</CardItem>
												</View>
											</Card>
										);
									})}
								</ScrollView>
							</View>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleAddDevice}
						>
							<Text style={styles.titleText} > Add new Location </Text>
						</TouchableOpacity>
					</Container>
				);
			} else {
				console.log("item--------->", this.state.deviceId);
				return (
					<Container style={styles.container}>
						<AppHeader back="Location" name="Add New Location" />
						<Content padder>
							<View>
								<Card>
									<CardItem header bordered>
										<Text>{this.state.deviceLocationId === 0 ? "Add Location" : "Edit Location"}</Text>
									</CardItem>
									<CardItem bordered>
										<Body style={styles.horizontal}>
											<TextInput
												placeholder="Location Name"
												style={styles.halfTextInput}
												maxLength={25}
												keyboardType="default"
												value={this.state.locationName}
												onChangeText={(text) => this.setState({ locationName: text })}
											/>
										</Body>
									</CardItem>
									<CardItem bordered>
										<Body style={styles.horizontal}>
											<Text style={styles.bodyText} >Location Type</Text>
										</Body>
									</CardItem>
									<CardItem bordered>
										<Body style={styles.horizontal}>
											<Picker
												style={styles.smallPicker}
												selectedValue={this.state.deviceLocationTypeId}
												mode='dropdown'
												onValueChange={(itemValue, itemIndex) => this.setState({ deviceLocationTypeId: itemValue })}>
												<Picker.Item label="Home" value="1" />
												<Picker.Item label="Organization" value="2" />
												<Picker.Item label="Public Place" value="3" />
											</Picker>
										</Body>
									</CardItem>
								</Card>
							</View>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleSubmitLocation}
						>
							<Text style={styles.titleText} > { this.state.deviceLocationId === 0 ? 'Insert Location' : 'Change Location' }</Text>
						</TouchableOpacity>

					</Container>
				);
			}
		} else {
			return (
				<View style={styles.loding}>
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
		data: state.LocationReducer && state.LocationReducer.data !== undefined ? state.LocationReducer.data : ""
	}
}


export default (connect(mapStateToProps, mapDispatchToProps)(Location));
