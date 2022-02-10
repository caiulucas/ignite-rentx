import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

export const Container = styled.View``;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: ${RFValue(24)}px;
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;

  align-items: center;
  justify-content: center;
`;

export const CarImage = styled(FastImage).attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
