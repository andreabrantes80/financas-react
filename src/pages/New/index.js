
import { useState } from 'react';
import { Background, Input, SubmitButton, SubmitText } from './styles';

import { useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import RegisterTypes from '../../components/RegisterTypes';
import api from '../../services/api';

export default function New() {

    const navigation = useNavigation();

    const [labelInput, setLabelInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [type, setType] = useState('receita');

    function handleSubmit() {

        Keyboard.dismiss();

        // Validação de campos vazios
        if (!labelInput.trim() || !valueInput.trim() || !type) {
            alert('Preencha todos os campos');
            return;
        }

        // Validação de número
        const valor = parseFloat(valueInput);
        if (isNaN(valor)) {
            alert('Insira um valor numérico válido');
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type} - Valor: ${valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        );
    }

    async function handleAdd() {

        try {

            Keyboard.dismiss();

            const today = new Date();

            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            const dateFormatted = `${year}-${month}-${day}`;

            await api.post('/receive', {
                description: labelInput,
                value: Number(valueInput),
                type: type,
                date: dateFormatted
            })

            setLabelInput('');
            setValueInput('');
            navigation.navigate('Home');

        } catch (error) {
            alert("Erro ao registrar");

        }

    }

    return (

        <TouchableWithoutFeedback>
            <Background>
                <Header title="Registrando" />

                <SafeAreaView style={{ marginTop: 14, alignItems: 'center' }} >
                    <Input
                        placeholder="Descrição desse registro"
                        placeholderTextColor="#999999"
                        value={labelInput}
                        onChangeText={(text)=> setLabelInput(text)}
                    />
                    <Input
                        placeholder="Valor desejado"
                        placeholderTextColor="#999999"
                        keyboardType="numeric"
                        value={valueInput}
                        onChangeText={(text) => setValueInput(text)}
                    />

                    <RegisterTypes type={type} sendTypeChanged={(item)=> setType(item)} />

                    <SubmitButton onPress={handleSubmit} >
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    )

}

