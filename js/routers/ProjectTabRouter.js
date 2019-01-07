import { TabNavigator } from 'react-navigation';
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import Notifications from "../components/notifications";
import Activity from "../components/activity";
import Me from "../components/me";
var tabNav = TabNavigator(
    {
        Home: { screen: Home },
        Notifications: { screen: Notifications},
        Activity: { screen: Activity },
        Me: { screen: Me }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                backgroundColor: '#EEE'
            }
        }
    }
);

export default tabNav;