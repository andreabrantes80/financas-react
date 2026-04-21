
import { Alert, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, IconView, IconViewDesc, Tipo, TipoText, ValorText, ValorTextDescricao } from "./styles";

export default function HistoricoList({ data, deleteItem }) {

    function handleDeleteItem() {
        Alert.alert(
            'Atenção',
            'Você tem certeza que deseja deletar esse registro?',
            [{
                text: 'Cancelar',
                style: 'cancel'
            }, {
                text: 'Continuar',
                onPress: () => deleteItem(data.id)
            }]
        )
    }
    return (
        <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
            <Container>
                <Tipo>
                    <IconView tipo={data.type} >
                        <Icon name={data.type === 'withdraw' ? 'arrow-down' : 'arrow-up'}
                            size={20}
                            color='#fff' />
                        <TipoText>{data.type === 'withdraw' ? 'Despesa' : 'Receita'}</TipoText>
                    </IconView>
                    <IconViewDesc>
                        <Icon name='chevron-right' size={20} />
                        <ValorTextDescricao>
                            {data.description}
                        </ValorTextDescricao>
                    </IconViewDesc>
                </Tipo>

                <ValorText>R$ {data.value}</ValorText>
            </Container>
        </TouchableWithoutFeedback>
    )
}