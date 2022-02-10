import React from 'react';
import { useWindowDimensions } from 'react-native';

import { useRoute } from '@react-navigation/native';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import { Container, Content, Title, Message, Footer } from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreen: string;
}

export const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();

  const { params } = useRoute();

  const { title, message, nextScreen } = params as Params;

  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton nextScreen={nextScreen} />
      </Footer>
    </Container>
  );
};
