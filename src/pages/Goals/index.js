import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Area, Background, GoalInfo, GoalItem, GoalTitle, GoalValue, List, Progress, ProgressBar, Title } from './styles';


export default function Goals() {

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadGoals() {
            try {
                const response = await api.get('/goals');
                setGoals(response.data);
            } catch (error) {
                console.log('Erro ao buscar metas:', error);
            } finally {
                setLoading(false);
            }
        }

        loadGoals();
    }, []);

    async function handleDeleteGoal(id) {

        if (Platform.OS === 'web') {
            // 👉 executa direto no web
            try {
                await api.delete(`/goal/${id}`);

                setGoals((oldGoals) =>
                    oldGoals.filter((item) => item.id !== id)
                );

            } catch (error) {
                console.log("ERRO COMPLETO:", error.response?.data);
                alert(error.response?.data?.error || "Erro ao deletar");
            }

            return;
        }


        Alert.alert(
            'Atenção',
            'Deseja deletar essa meta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Continuar',
                    onPress: async () => {
                        try {
                            await api.delete(`/goal/${id}`);

                            // 🔄 atualiza lista sem precisar recarregar tudo
                            setGoals((oldGoals) =>
                                oldGoals.filter((item) => item.id !== id)
                            );

                        } catch (error) {
                            console.log(error);
                            alert('Erro ao deletar meta');
                        }
                    }
                }
            ]
        );
    }

    return (
        <Background>
            <Area>
                <Title>Minhas Metas</Title>
                {loading ? (
                    <ActivityIndicator size="large" color="#3b3dbf" />
                ) : (
                    <List
                        data={goals}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const current = item.current || 0;
                            const target = item.target || 0;
                            const progress = item.progress || 0;
                            const remaining = item.remaining || 0;

                            return (
                                <GoalItem>

                                    <TouchableOpacity
                                        onPress={() => handleDeleteGoal(item.id)}
                                        style={{ position: 'absolute', right: 10, top: 10 }}
                                    >
                                        <Icon name="delete" size={20} color="#ff3b3b" />
                                    </TouchableOpacity>
                                    <GoalTitle>{item.name}</GoalTitle>

                                    <GoalValue>
                                        R$ {current.toFixed(2)} / R$ {target.toFixed(2)}
                                    </GoalValue>

                                    <GoalInfo>
                                        {progress.toFixed(1)}% concluído
                                    </GoalInfo>

                                    <GoalInfo>
                                        Faltam: R$ {remaining.toFixed(2)}
                                    </GoalInfo>

                                    <ProgressBar>
                                        <Progress style={{ width: `${progress}%` }} />
                                    </ProgressBar>

                                </GoalItem>
                            );
                        }}
                    />
                )}
            </Area>
        </Background>
    );
}