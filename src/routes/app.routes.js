import { createDrawerNavigator } from "@react-navigation/drawer";

import CustomDrawer from "../components/CustomDrawer";
import Goals from "../pages/Goals";
import Home from "../pages/Home";
import New from "../pages/New";
import NewGoal from "../pages/NewGoal";
import Profile from "../pages/Profile";

const AppDrawer = createDrawerNavigator();

function AppRoutes() {
    return (
        <AppDrawer.Navigator

            drawerContent={(props)=> <CustomDrawer {...props} />}
            screenOptions={{
            headerShown: false,
            drawerStyle: {
                backgroundColor: '#fff',
                paddingTop: 20
            },
            drawerActiveBackgroundColor: '#3b3dbf',
            drawerActiveTintColor: '#fff',

            drawerInactiveBackgroundColor: '#f0f2ff',
            drawerInactiveTintColor: '#121212',

            drawerItemStyle: {
                marginBottom: 8
            }

        }}>
            <AppDrawer.Screen
                name="Home"
                component={Home}
            />

            <AppDrawer.Screen
                name="Registrar"
                component={New}
            />

            <AppDrawer.Screen
                name="Inserir Metas"
                component={NewGoal}
            />

            <AppDrawer.Screen
                name="Metas"
                component={Goals}
            />

            <AppDrawer.Screen
                name="Perfil"
                component={Profile}
            />

        </AppDrawer.Navigator>
    )
}

export default AppRoutes;
