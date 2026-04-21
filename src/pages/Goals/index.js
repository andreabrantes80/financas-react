import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
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