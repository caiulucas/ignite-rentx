import React from 'react';
import { Feather } from '@expo/vector-icons';

import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Accessory } from '../../../components/Accessory';
import { BackButton } from '../../../components/BackButton';
import { ImageSlider } from '../../../components/ImageSlider';

import SpeedSvg from '../../../assets/speed.svg';
import AccelerationSvg from '../../../assets/acceleration.svg';
import ForceSvg from '../../../assets/force.svg';
import GasolineSvg from '../../../assets/gasoline.svg';
import ExchangeSvg from '../../../assets/exchange.svg';
import PeopleSvg from '../../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Subtitle,
  Name,
  Rent,
  Price,
  Accessories,
  Footer,
} from '../styles';
import {
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  Title,
  TextDetail,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceTotal,
} from './styles';

import { Button } from '../../../components/Button';

export const SchedulingDetails: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Subtitle>Lamborghini</Subtitle>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Subtitle>Ao dia</Subtitle>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina HP" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <Title>De</Title>
            <TextDetail>18/06/21</TextDetail>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={colors.text}
          />

          <DateInfo>
            <Title>Até</Title>
            <TextDetail>18/06/21</TextDetail>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <Title>Total</Title>
          <RentalPriceDetails>
            <TextDetail>R$ 580 x3 diárias</TextDetail>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar agora" color={colors.success} />
      </Footer>
    </Container>
  );
};
