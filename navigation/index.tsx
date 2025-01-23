import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AreaForm from 'screens/area/AreaForm';
import AreaList from 'screens/area/AreaList';
import LoginScreen from 'screens/auth/LoginScreen';
import HomeScreen from 'screens/HomeScreen';
import LogsScreen from 'screens/LogsScreen';
import PersonForm from 'screens/person/PersonForm';
import PersonList from 'screens/person/PersonList';
import ProductForm from 'screens/product/ProductForm';
import ProductList from 'screens/product/ProductList';
import ImportCSVScreen from 'screens/ImportCSVScreen'

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AreaForm: { id?: string };
  AreaList: undefined;
  PersonForm: { id?: string }; 
  PersonList: undefined;
  ProductForm: { id?: string }; 
  ProductList: undefined;
  ImportCSVScreen: undefined;
  Logs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">        
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

        {/* Área */}
        <Stack.Screen name="AreaForm" component={AreaForm} options={{ title: 'Cadastro de Área' }} />
        <Stack.Screen name="AreaList" component={AreaList} options={{ title: 'Lista de Áreas' }} />

        {/* Pessoa */}
        <Stack.Screen name="PersonForm" component={PersonForm} options={{ title: 'Cadastro de Pessoa' }} />
        <Stack.Screen name="PersonList" component={PersonList} options={{ title: 'Lista de Pessoas' }} />

        {/* Produto */}
        <Stack.Screen name="ProductForm" component={ProductForm} options={{ title: 'Cadastro de Produto' }} />
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Lista de Produtos' }} />

        {/* Logs */}
        <Stack.Screen name="Logs" component={LogsScreen} options={{ title: 'Logs' }} />
        
        {/* CSV */}
        <Stack.Screen name="ImportCSV" component={ImportCSVScreen} options={{ title: 'Importar' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
