import React, { Component } from "react";
import {Login,Home,SideBar} from './Components';
import { StackNavigator } from "react-navigation";
import Drawer from "./SideBarNavigator";



const AppNavigation = StackNavigator ({
    Login : {screen : Login},
    Drawer : { screen : Drawer }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
)

export default AppNavigation;
