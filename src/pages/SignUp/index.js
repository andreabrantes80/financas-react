import { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import {
  AreaInput,
  Background,
  Container,
  Input,
  SubmitButton,
  SubmitText
} from '../SignIn/styles';

export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSignUp() {
    // 🔴 Validação básica
    if (!nome || !email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    // 🔴 Validação simples de email
    if (!email.includes('@')) {
      Alert.alert('Atenção', 'Digite um email válido');
      return;
    }

    // 🔴 Validação de senha
    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // 🔥 chama o contexto (que agora faz login automático)
    signUp(nome.trim(), email.trim().toLowerCase(), password);
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <AreaInput>
          <Input
            placeholder="Nome"
            placeholderTextColor="#999999"
            value={nome}
            onChangeText={setNome}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Email"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            placeholderTextColor="#999999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </AreaInput>

        <SubmitButton
          activeOpacity={0.8}
          onPress={handleSignUp}
          disabled={loadingAuth}
        >
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}