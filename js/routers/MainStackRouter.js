import React, { Component } from "react";
import Login from "../components/login/";
import MainTabRouter from './MainTabRouter';
import ProjectStackRouter from '@routers/ProjectStackRouter';
import HomeDrawerRouter from "./HomeDrawerRouter";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
HomeDrawerRouter.navigationOptions = ({ navigation }) => ({
  header: null
});
export default (StackNav = StackNavigator({
  Login: { screen: Login },
  Main: { screen: MainTabRouter },
  Project: { screen: ProjectStackRouter}
}));
