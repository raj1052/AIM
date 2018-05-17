import React, { Component } from "react";
import { Image } from "react-native";
import { Drawer, Container, Content, Left, Right, Text, ListItem, List, Badge, View } from 'native-base';
// import {Container,Content,Left,Right,Text,ListItem,List, Badge} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getStorage } from '../../services';

import styles from "../styles";

const datas = [
	{
		name: "Dashboard",
		route: "Home",
		color: "#60B7FE",
		icon: "view-dashboard"
	}, {
		name: "Device",
		route: "Device",
		color: "#EF9F4E",
		icon: "developer-board"
	}, {
		name: "Location",
		route: "Location",
		color: "#60B7FE",
		icon: "home-automation"
	}, {
		name: "Usage",
		route: "Usage",
		color: "#EF9F4E",
		icon: "chart-bubble"
	}, {
		name: "Settings",
		route: "Home",
		color: "#00A1CB",
		icon: "settings"
	}, {
		name: "Logout",
		route: "Logout",
		color: "#D54D54",
		icon: "logout"
	}
]

class SideBar extends Component {

	render() {
		return (
			<Container>
				<Content style={{backgroundColor: '#fff'}}>
					<Image
						source={require('../../assets/img/background-login1.jpg')}
						style={{
							height: 120,
							width: "100%",
							alignSelf: "stretch",
							position: "absolute"
						}}
					/>
					<Image
						square
						style={{
							height: 80,
							width: 70,
							position: "absolute",
							alignSelf: "center",
							top: 20
						}}
						source={require('../../assets/img/250.png')}
					/>
					<List
						dataArray={datas}
						contentContainerStyle={{ marginTop: 120 }}
						renderRow={data => {
							return (
								<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)} >
									<Icon active name={data.icon} style={{ color: String(`${data.color}`), fontSize: 30, width: 30 }} />
									<Text style={{ marginLeft: 20 }}>{data.name}</Text>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
