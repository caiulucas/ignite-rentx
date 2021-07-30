import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ImageIndexProps {
  active: boolean;
}

export const Container = styled.View``;

export const ImageIndexes = styled.View`
  flex-direction: row;
  align-self: flex-end;
  padding-right: ${RFValue(24)}px;
`;

export const ImageIndex = styled.View<ImageIndexProps>`
  width: ${RFValue(6)}px;
  height: ${RFValue(6)}px;

  margin-left: ${RFValue(8)}px;
  border-radius: ${RFValue(6)}px;

  background-color: ${({ theme, active }) =>
    active ? theme.colors.title : theme.colors.shape};
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${RFValue(132)}px;

  align-items: center;
  justify-content: center;
`;

export const CarImage = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${RFValue(280)}px;
  height: ${RFValue(132)}px;
`;
