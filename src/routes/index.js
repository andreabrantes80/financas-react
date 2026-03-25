import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthContext } from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';


function Routes() {
    const { signed, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4ff' }}>
                <ActivityIndicator size='large' color='#131313' />

            </View>
        )
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes/>
    ); // Simulação de estado de autenticação
}

export default Routes;