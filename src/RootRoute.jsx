import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREEN} from './constants/uri';

import Home from './pages/home/App';
import Schdl from './pages/schdl/App';
import Rpt from './pages/rpt/App';
import Auth from './pages/auth/App';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name={SCREEN.HOME} component={Home} />
    <Tab.Screen name={SCREEN.SCHDL} component={Schdl} />
    <Tab.Screen name={SCREEN.RPT} component={Rpt} />
  </Tab.Navigator>
);

const RootRoute = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={SCREEN.TAB} component={TabNavigator} />
        <Stack.Screen name={SCREEN.AUTH} component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootRoute;
