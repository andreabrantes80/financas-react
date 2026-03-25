
import { useContext, useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { AreaInput, Background, Container, Input, SubmitButton, SubmitText } from '../SignIn/styles';

export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {

    if (nome === '' || email === '' || password === '') return;

    signUp(nome, email, password);
  }


  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <AreaInput>
          <Input placeholder="Nome" value={nome} onChangeText={(text) => setNome(text)} />
        </AreaInput>
        <AreaInput>
          <Input placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
        </AreaInput>
        <AreaInput>
          <Input placeholder="Senha" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
        </AreaInput>
        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff"></ActivityIndicator>
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}

