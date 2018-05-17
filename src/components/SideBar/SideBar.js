import React, { Component } from "react";
import {Container,Content,Left,Right,Text,ListItem,List, Badge} from "native-base";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from "../styles";
const datas = [
	{
		name : "Dashboard",
		route :"Home",
		color: "#60B7FE",
		icon: "view-dashboard"
	},{
		name : "Device",
		route :"Device",
		color: "#EF9F4E",
		icon: "developer-board"
	},{
		name : "Location",
		route :"Location",
		color: "#60B7FE",
		icon: "home-automation"
	},{
		name : "Usage",
		route :"Usage",
		color: "#EF9F4E",
		icon: "chart-bubble"
	},{
		name : "Settings",
		route :"Home",
		color: "#00A1CB",
		icon: "settings"
	},{
		name : "Logout",
		route :"Logout",
		color: "#D54D54",
		icon: "logout"
	}
]


class SideBar extends  Component {

  render() {
  		return (
			<Container>
			<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>

				<List
					dataArray={datas}
					renderRow={data =>
						<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
							<Left>
								<Icon active name={data.icon} style={{ color: String(`${data.color}`), fontSize: 30, width: 30 }} />
								<Text style={{marginLeft:20}}>
									{data.name}
								</Text>
							</Left>
						</ListItem>}
				/>
			</Content>
		</Container>
  	);
  }
}

export default SideBar;
