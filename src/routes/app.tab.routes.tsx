import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';
import { AppStackRoutes } from './app.stack.routes';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabRoutes: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.text_detail,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? RFValue(20) : 0,
          height: RFValue(64),
          borderTopWidth: 1,
          borderTopColor: colors.line,
          backgroundColor: colors.background_primary,
        },
      }}
    >
      <Screen
        name="AppStack"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={RFValue(24)} height={RFValue(24)} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={RFValue(24)} height={RFValue(24)} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={RFValue(24)} height={RFValue(24)} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
};
