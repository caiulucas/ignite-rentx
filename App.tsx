import React from 'react';
import {
  useFonts,
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import { ThemeProvider } from 'styled-components';

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens/Home';
import theme from './src/styles/theme';
import { CarDetails } from './src/screens/Details/CarDetails';
import { Scheduling } from './src/screens/Scheduling';
import { SchedulingDetails } from './src/screens/Details/SchedulingDetails';

export const App: React.FC = () => {
  const [fontsIsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsIsLoaded) return <AppLoading />;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <SchedulingDetails />
    </ThemeProvider>
  );
};

export default App;
