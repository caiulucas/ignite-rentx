import AnimatedLottieView from 'lottie-react-native';
import React from 'react';

// eslint-disable-next-line import/extensions
import LoadingCar from '../../assets/loading_car.json';

import { Container } from './styles';

export const LoadAnimation: React.FC = () => {
  return (
    <Container>
      <AnimatedLottieView
        source={LoadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
};
