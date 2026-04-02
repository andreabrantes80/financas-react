
import { AreaInput, Background, Container, Input, Link, LinkText, Logo, SubmitButton, SubmitText } from './styles';

import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';



export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Logo
          source={require('../../assets/Logo.png')} />

        <AreaInput>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="E-mail"
            placeholderTextColor="#999999" />

        </AreaInput>

        <AreaInput>
          <Input
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder='Senha'
            placeholderTextColor="#999999"
            secureTextEntry/>
        </AreaInput>

        <SubmitButton activeOpacity={0.8} onPress={handleLogin} >
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Acessar</SubmitText>
          )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta</LinkText>
        </Link>

      </Container>
    </Background>
  );
}