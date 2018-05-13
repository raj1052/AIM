import React, { Component } from "react";
import { SideBar, Home, Logout, Device, Location } from './Components';
import { DrawerNavigator } from "react-navigation";

const Drawer = DrawerNavigator ({
    SideBar: { screen: SideBar },
    Home : { screen : Home},
    Device : { screen : Device},
    Location : { screen : Location },
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
