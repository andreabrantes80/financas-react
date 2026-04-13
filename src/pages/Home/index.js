import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BalanceItem from '../../components/BalanceItem';
import CalendarModal from '../../components/CalendarModal';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import api from '../../services/api';
import { Area, Background, List, ListBalance, Title } from './styles';


export default function Home() {
    // const { signOut } = useContext(AuthContext)

    const isFocused = useIsFocused();

    const [listBalance, setListBalance] = useState([]);

    const [movements, setMovements] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [dateMovements, setDateMovements] = useState(new Date());

    useEffect(() => {

        let isActive = true;

        async function getMovements() {

            // let dateFormated = format(dateMovements, 'dd/MM/yyyy');

            // let dateBR = format(dateMovements, 'dd/MM/yyyy');
            // let dateISO = format(dateMovements, 'yyyy-MM-dd');

            // let date = new Date(dateMovements);
            // let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            // let dateFormated = format(onlyDate, 'dd/MM/yyyy');
            // let dateISO = dateMovements.toISOString();

            try {

                let dateISO = format(dateMovements, 'yyyy-MM-dd');

                const balance = await api.get('/balance', {
                    params: {
                        date: dateISO
                    }
                })

                const receives = await api.get('/receives', {
                    params: {
                        date: dateISO
                    }
                })


                if (isActive) {
                    setMovements(receives.data)
                    setListBalance(balance.data)
                }
            } catch (error) {
                console.log('Erro ao buscar dados:', error);
            }

        }

        getMovements();

        return () => isActive = false;
    }, [isFocused, dateMovements])

    async function handleDelete(id) {
        try {
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })

            setDateMovements(new Date())

        } catch (err) {
            console.log(err)
       }

    }

    function filterDateMovements(dateSelected) {
        setDateMovements(dateSelected);
    }


    return (
        <Background>
            <Header title='Minhas movimentações' />

            <ListBalance
                data={listBalance}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.tag}
                renderItem={({ item }) => (<BalanceItem data={item} />)}
            />

            <Area>
                <TouchableOpacity onPress={()=> setModalVisible(true)} >
                    <Icon name='event' color='#121212' size={30}/>
                </TouchableOpacity>
                <Title>Ultimas movimentações </Title>
            </Area>

            <List
                data={movements}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <HistoricoList data={item } deleteItem={handleDelete} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 20}}
            />

            <Modal visible={modalVisible} animationType='fade' transparent={true} >
                <CalendarModal setVisible={() => setModalVisible(false)}
                    handleFilter={filterDateMovements} />
            </Modal>

        </Background>
    )
}