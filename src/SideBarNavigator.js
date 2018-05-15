import React, { Component } from 'react';
import { SideBar } from './components';
import { Home, Logout, Device, Location, DeviceDetails } from './views';
import { DrawerNavigator } from "react-navigation";

const Drawer = DrawerNavigator ({
    SideBar: { screen: SideBar },
    Home : { screen : Home},
    Device : { screen : Device},
    Location : { screen : Location },
    DeviceDetails : { screen : DeviceDetails },
    Logout : { screen : Logout},
  },
  {
    initialRouteName: "Home",
    contentOptions: {
        activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  })

export default Drawer;
