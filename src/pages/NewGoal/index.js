import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../../components/Header';
import api from '../../services/api';
import { Background, Input, SubmitButton, SubmitText } from './styles';

export default function NewGoal() {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [target, setTarget] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleAdd() {
        try {
            Keyboard.dismiss();

            if (!name.trim() || !target.trim()) {
                Alert.alert('Atenção', 'Preencha todos os campos');
                return;
            }

            const value = parseFloat(target);

            if (isNaN(value) || value <= 0) {
                Alert.alert('Erro', 'Digite um valor válido e maior que zero');
                return;
            }

            setLoading(true);

            const response = await api.post('/goal', {
                name: name.trim(),
                target: value
            });

            setLoading(false);
            setName('');
            setTarget('');
            Alert.alert('Sucesso', 'Meta criada com sucesso!');
            navigation.goBack();

        } catch (error) {
            setLoading(false);
            console.error('Erro ao criar meta:', error);
            Alert.alert('Erro', error.response?.data?.message || 'Erro ao criar meta');
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <Background>
                <Header title="Nova Meta" />

                <Input
                    placeholder="Nome da meta"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    editable={!loading}
                    maxLength={50}
                />

                <Input
                    placeholder="Valor da meta"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                    value={target}
                    onChangeText={(text) => setTarget(text.replace(/[^0-9.]/g, ''))}
                    editable={!loading}
                    maxLength={10}
                />

                <SubmitButton onPress={handleAdd} disabled={loading}>
                    <SubmitText>{loading ? 'Criando...' : 'Criar Meta'}</SubmitText>
                </SubmitButton>
            </Background>
        </KeyboardAvoidingView>
    );
}