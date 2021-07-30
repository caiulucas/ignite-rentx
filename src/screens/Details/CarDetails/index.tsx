import React from 'react';
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
import { About } from './styles';

import { Button } from '../../../components/Button';

export const CarDetails: React.FC = () => {
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

        <About>
          Este automóvel desportivo. Surgiu do lendário touro de lide indultado
          na praça Real Maestranza de Sevilla. É um belíssimo carro para quem
          gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
};
