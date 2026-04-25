
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { RegisterContainer, RegisterLabel, RegisterTypesButton } from "./styles";

export default function RegisterTypes({ type, sendTypeChanged }) {

    const [typeChecked, setTypeChecked] = useState(type);

    function changeType(name) {
        sendTypeChanged(name);
    }

    return (
        <RegisterContainer>
            <RegisterTypesButton checked={type === 'receita'}
            onPress={()=> changeType('receita')}
            >
                <Feather name="arrow-up" size={25} color="#121212" />
                <RegisterLabel>
                    Receita
                </RegisterLabel>

            </RegisterTypesButton>

            <RegisterTypesButton checked={type === 'despesa'}
                onPress={() => changeType('despesa')}
            >
                <Feather name="arrow-down" size={25} color="#121212" />
                <RegisterLabel>
                    Despesa
                </RegisterLabel>

            </RegisterTypesButton>

        </RegisterContainer>
    );
}