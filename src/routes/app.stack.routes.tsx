import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Confirmation } from '../screens/Confirmation';
import { CarDetails } from '../screens/Details/CarDetails';
import { SchedulingDetails } from '../screens/Details/SchedulingDetails';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { Scheduling } from '../screens/Scheduling';
import { SignIn } from '../screens/SignIn';
import { FirstStep } from '../screens/SignUp/FirstStep';
import { SecondStep } from '../screens/SignUp/SecondStep';
import { Splash } from '../screens/Splash';

const { Navigator, Screen } = createStackNavigator();

export const AppStackRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};
