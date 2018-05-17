import React, { Component } from "react";
import { AppHeader } from '../../components/AppHeader';
import { Alert, ScrollView, StyleSheet, ActivityIndicator, View, TouchableOpacity, Button } from 'react-native';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HTTP, setStorage, getStorage } from '../../services';
import * as actionCreators from './actionCreators';
import { Container, Header, Content, Card, CardItem, Text, Body, Form, Left, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Usage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "",
			isLoading: true
		}
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		console.log("--------------------->");
		// this.props.actions.getData();
		this.props.actions.getUsage();
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

	render() {
		console.log("state--------------------------->", this.state);
		const { navigate } = this.props.navigation;
		if (!this.state.isLoading) {
			return (
				<Container>
					<AppHeader name="Usage Details" navigation={this.props.navigation} />
					<View style={[styles.horizontal]}>
						<Content>
							<Card >
								<CardItem header bordered>
									<Text>Your Total Usage </Text>
								</CardItem>
							</Card>
							<Card style={{ marginBottom: 0, marginLeft: 0, marginRight: 0, backgroundColor: '#E4E5E7' }}>
								<CardItem header bordered>
									<Text>Your Total Usage </Text>
								</CardItem>
							</Card>
						</Content>
					</View>
					<Content padder>
						<View>
							<ScrollView>
								{this.state.data.data !== undefined && this.state.data.data.controllerData.map((d, i) => {
									return (
										<Card>
											<CardItem header bordered>
												<Text>{d.location_name}</Text>
											</CardItem>
											<CardItem bordered>
												<Body style={styles.horizontal}>
													<Text style={styles.LabelText}>Controller Name   </Text>
													<Text>{d.device_controller_name}</Text>
												</Body>
											</CardItem>
											<CardItem bordered>
												<Body style={styles.horizontal}>
												<Text style={styles.LabelText}>Total Usage(In units)   </Text>
												<Text>{d.total_unit}</Text>
												</Body>
											</CardItem>
											<CardItem bordered>
												<Body style={styles.horizontal}>
													<Text style={styles.LabelText}>Total Rate   </Text>
													<Text>{d.total_rate}</Text>
												</Body>
											</CardItem>
											<CardItem footer >
												<Text>Current Status          </Text>
												<Text>{d.status === 1 ? "ON": "OFF"}</Text>
											</CardItem>
										</Card>
									)
								})}
							</ScrollView>
						</View>
					</Content>
				</Container>
			);
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
		flexDirection: 'row'
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#03618D',
		padding: 20
	},
	LabelText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	textInput: {
		fontSize: 18,
		marginBottom: 7
	},
	bodyText: {
		fontSize: 18,
		marginTop: 10,
		marginLeft: 10
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
		data: state.UsageReducer && state.UsageReducer.data !== undefined ? state.UsageReducer.data : ""
	}
}

export default (connect(mapStateToProps, mapDispatchToProps)(Usage));
