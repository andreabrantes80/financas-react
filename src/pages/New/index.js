
import { useState } from 'react';
import { Background, Input, SubmitButton, SubmitText } from './styles';

import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import RegisterTypes from '../../components/RegisterTypes';

export default function New() {

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
        alert('teste')

    }

    return (

        <TouchableWithoutFeedback>
            <Background>
                <Header title="Registrando" />

                <SafeAreaView style={{ marginTop: 14, alignItems: 'center' }} >
                    <Input
                        placeholder="Descrição desse registro"
                        value={labelInput}
                        onChangeText={(text)=> setLabelInput(text)}
                    />
                    <Input
                        placeholder="Valor desejado"
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

