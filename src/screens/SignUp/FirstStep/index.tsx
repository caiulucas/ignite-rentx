import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Keyboard } from 'react-native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from './styles';

const schema = Yup.object().shape({
  driverLicense: Yup.string().required('CNH obrigatória'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  name: Yup.string().required('Nome obrigatório'),
});

export const FirstStep: React.FC = () => {
  const { navigate } = useNavigation();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  async function handleNextStep() {
    const data = { name, email, driverLicense };
    try {
      await schema.validate(data);
      navigate('SecondStep', { user: data });
    } catch (error) {
      Alert.alert('Ops!', error.message);
    }
  }

  return (
    <Container behavior="height">
      <Header>
        <BackButton />
        <Steps>
          <Bullet active />
          <Bullet />
        </Steps>
      </Header>

      {!isKeyboardVisible && (
        <>
          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil.</SubTitle>
        </>
      )}
      <Form>
        <FormTitle>1. Dados</FormTitle>

        <Input
          iconName="user"
          placeholder="Nome"
          onChangeText={setName}
          value={name}
        />
        <Input
          iconName="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <Input
          iconName="credit-card"
          placeholder="CNH"
          keyboardType="numeric"
          last
          onChangeText={setDriverLicense}
          value={driverLicense}
        />
      </Form>
      <Button title="Próximo" onPress={handleNextStep} />
    </Container>
  );
};
