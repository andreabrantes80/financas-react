
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { RegisterContainer, RegisterLabel, RegisterTypesButton } from "./styles";

export default function RegisterTypes({ type, sendTypeChanged }) {

    const [typeChecked, setTypeChecked] = useState(type);

    function changeType(name) {
        if (name === 'receita') {
            setTypeChecked('receita');
            sendTypeChanged('receita');
        } else {
            setTypeChecked('despesa');
            sendTypeChanged('despesa');
        }
    }

    return (
        <RegisterContainer>
            <RegisterTypesButton checked={typeChecked === 'receita' ? true : false}
            onPress={()=> changeType('receita')}
            >
                <Feather name="arrow-up" size={25} color="#121212" />
                <RegisterLabel>
                    Receita
                </RegisterLabel>

            </RegisterTypesButton>

            <RegisterTypesButton checked={typeChecked === 'despesa' ? true : false}
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