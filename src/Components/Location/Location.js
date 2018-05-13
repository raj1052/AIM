import React, { Component } from "react";
import { AppHeader } from '../Common/AppHeader';
import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Picker, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Button, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			isLoading: true,
			addLocation: false,
			locationName:"",
			deviceLocationTypeId: 1,
			deviceLocationId: 0
		}
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		console.log("--------------------->");
		this.props.actions.getLocations();
		this.setState({ isLoading: false });
		// this.setState({
		//     data : []
		// })
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
		this.setState({ addLocation: true });
		// let formData = {
		// 	"device_location_id" : this.state.locationId,
		// 	"device_type_id": this.state.deviceId,
		// 	"device_key": this.state.deviceKey,
		// 	"secretKey": this.state.secretKey
		// }
		// console.log("formdata------------------------------>", formData);
		// this.setState({isLoading: true});
		// await this.props.actions.insertUserDevice(formData);
		// this.setState({isLoading: false});
	}

	handleInsertLocation = async () => {
		this.setState({ addLocation: true });
		let formData = {
			"device_location_id": this.state.deviceLocationId,
			"device_location_type_id": this.state.deviceLocationTypeId,
			"location_name": this.state.locationName
		}
		console.log("formdata----------------->", formData);
		await this.props.actions.insertLocation(formData);
		// await this.props.actions.getData();
		// this.setState({ addDevice: false });
	}

	render() {
		console.log("state--------------------------->", this.state);
		var width = Dimensions.get('window').width;
		if (!this.state.isLoading) {
			if (!this.state.addLocation) {
				return (
					<Container style={styles.container}>
						<AppHeader name="AIM" navigation={this.props.navigation} />
						<Content padder>
							<ScrollView contentContainerStyle={{ marginBottom: 5 }}>
								{this.state.data.data !== undefined && this.state.data.data.map((d, i) => {
									return (
										<Content key={i}>
											<Card>
												<CardItem>
													<Left>
														{
															d.device_location_type_id === 1 && <Icon name="home-modern" size={30} color="#4486F7" />
														}
														{
															d.device_location_type_id === 2 && <Icon name="domain" size={30} color="#4486F7" />
														}
														{
															d.device_location_type_id === 3 && <Icon name="city" size={30} color="#4486F7" />
														}
														<Body>
															<View style ={{ flex: 1, flexDirection: 'row'}}>
																<Text style={styles.bodyText}>Location Name:</Text>
																<Text style={{ marginLeft: 15 }}>{d.location_name}</Text>
															</View>
															<View style ={{ flex: 1, flexDirection: 'row'}}>
																<Text style={styles.bodyText}>Location Type:</Text>
																<Text style={{ marginLeft: 15 }}>{d.device_location_type}</Text>
															</View>
														</Body>
													</Left>
													<Right>
														<Icon name="delete" size={30} color="#DE0702" />
													</Right>
												</CardItem>
												{/* <CardItem>
													<Left>
														{
															d.device_location_type_id === 1 && <Icon name="home-modern" size={30} color="#4486F7" />
														}
														{
															d.device_location_type_id === 2 && <Icon name="domain" size={30} color="#4486F7" />
														}
														{
															d.device_location_type_id === 3 && <Icon name="city" size={30} color="#4486F7" />
														}
													</Left>
													<Body>
													<Text> Location Name: </Text>
													<CardItem>
													<View style={{ flex: 1, flexDirection: 'row'}}>
														
														<Text style={{ marginLeft: 25 }} >
															{d.location_name}
														</Text>
													</View>
												</CardItem>
												<CardItem footer>
													<Text style={styles.bodyText} > Location Type: </Text>
													<Text style={{ marginLeft: 25 }}>{d.device_location_type}</Text>
												</CardItem>
													</Body>
												</CardItem> */}

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
							<Form>
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Icon name="home-map-marker" size={30} color="#4486F7" style={{marginLeft: 5}}/>
									<Text style={styles.bodyText} > Location Name </Text>
									<Picker
										style={{ marginBottom: 7, width: width / 2, marginLeft: 15 }}
										selectedValue={this.state.deviceLocationTypeId}
										onValueChange={(itemValue, itemIndex) => this.setState({ deviceLocationTypeId: itemValue })}>
										<Picker.Item label="Home" value="1" />
										<Picker.Item label="Organization" value="2" />
										<Picker.Item label="Public Place" value="3" />
									</Picker>
								</View>
								<TextInput
									placeholder="Location Name"
									style={styles.textInput}
									maxLength={25}
									keyboardType="default"
									onChangeText={(text) => this.setState({ locationName: text })}
								/>
							</Form>
						</Content>
						<TouchableOpacity
							style={styles.button}
							onPress={this.handleInsertLocation}
						>
							<Text style={styles.titleText} > Insert Location </Text>
						</TouchableOpacity>

					</Container>
				);
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
	// picker: {
	// 	marginBottom: 7,
	// 	width: width/2
	// },
	textInput: {
		fontSize: 18,
		marginBottom: 7
	},
	bodyText: {
		fontSize: 18,
		marginTop: 5,
		color: 'grey',
		marginLeft: 15
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
		data: state.LocationReducer && state.LocationReducer.data !== undefined ? state.LocationReducer.data : ""
	}
}


export default (connect(mapStateToProps, mapDispatchToProps)(Location));
