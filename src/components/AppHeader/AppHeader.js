import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Item,
    Left,
    Right,
    Label,
    Input,
    Body,
    Form,
    Text
} from "native-base";

import { View, TouchableHighlight, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigator } from 'react-navigation';

class AppHeader extends Component {
    constructor() {
        super();
    }

    render() {
        const { back, navigation } = this.props;
        console.log("------------------------------------->", navigation)
        return (
            <Header backgroundColor="#03618D" >
                <Left style={{ flex: 1, flexDirection: 'row' }}>
                    {
                        this.props.back && this.props.back !== undefined ?  
                            <TouchableHighlight activeOpacity={5} underlayColor="#fff" onPress={() => this.props.navigation.navigate('Device')}>
                                <View>
                                    <Icon name="arrow-left" size={28} color="#fff" />
                                </View>
                            </TouchableHighlight> : <View/>
                            
                    }                    
                    <Title style={{ marginLeft: 15 }}>{this.props.name}</Title>
                </Left>
                <Right />

            </Header>
        );
    }
}

export default AppHeader;
